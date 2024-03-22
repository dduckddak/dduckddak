import cv2
import io
import numpy as np
import urllib.request
import dlib
from util.S3util import S3Util
from util.makeKeyUtil import MakeKeyUtil

## S3 버킷
s3_util = S3Util('ddukddak')

def set_no_photo(bookId, pageId, userSeq, generatedId) :
    source_file_name = MakeKeyUtil.book_photo_nonblank(bookId,pageId)
    print(source_file_name)
    target_file_name = MakeKeyUtil.make_book_photo(userSeq, generatedId, pageId)
    print(target_file_name)

    s3_util.copy_file(source_file_name, target_file_name)

def set_yes_photo(bookId,pageId,userSeq,generatedId, x, y, radius, photoId) :
    file_name = MakeKeyUtil.extract_photo(userSeq, photoId) + ".png" 
    public_url = s3_util.generate_public_url(file_name)

    resp = urllib.request.urlopen(public_url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_UNCHANGED)  # 이미지 디코딩

    wsize = 2 * int(radius)
    resized_image = cv2.resize(image, dsize=(wsize, wsize), interpolation=cv2.INTER_LINEAR)

    cv2.imwrite('result_img/resized_image.png', resized_image)

    canvas = np.zeros((2253, 2048, 4), dtype=np.uint8)
    wx = int(x) 
    wy = int(y)
    start_x = wx - resized_image.shape[1] // 2
    start_y = wy - resized_image.shape[0] // 2

    end_x = start_x + resized_image.shape[1]
    end_y = start_y + resized_image.shape[0]
    canvas[start_y:end_y, start_x:end_x, :] = resized_image

    cv2.imwrite('result_img/canvas.png', canvas)

    file_name = MakeKeyUtil.book_photo_blank(bookId, pageId)
    public_url = s3_util.generate_public_url(file_name)

    resp = urllib.request.urlopen(public_url)
    tgt_image = np.asarray(bytearray(resp.read()), dtype="uint8")
    tgt_image = cv2.imdecode(tgt_image, cv2.IMREAD_UNCHANGED)  # 이미지 디코딩

    alpha_mask = tgt_image[:,:,3] > 0
    canvas[alpha_mask] = tgt_image[alpha_mask]

    cv2.imwrite('result_img/final_image.png', canvas)

    is_success, buffer = cv2.imencode(".png", canvas)
    if not is_success: 
        return False
    
    io_buf = io.BytesIO(buffer)

    file_name = MakeKeyUtil.make_book_photo(userSeq, generatedId, pageId)
    upload_success = s3_util.upload_fileobj(io_buf, file_name) 

    return upload_success



def make_fairytale_photo(userSeq, mainPhoto, subPhoto, bookId, generatedId):
    file_name = MakeKeyUtil.book_file(bookId)
    file_stream = s3_util.get_file(file_name)

    try:
        if file_stream:
            with io.TextIOWrapper(file_stream, encoding='utf-8') as file :
                for line in file :
                    line = line.strip()
                    parts = line.split()

                    page_id, x, y, radius, label = parts

                    print(parts)

                    if(label == 'no'):
                        set_no_photo(bookId,page_id,userSeq,generatedId)
                    else :
                        if(label == 'main'):
                            set_yes_photo(bookId,page_id,userSeq,generatedId, x, y, radius, mainPhoto)
                        elif(label == 'sub'):
                            set_yes_photo(bookId,page_id,userSeq,generatedId, x, y, radius, subPhoto)
                        
    except Exception as e :
        print(e)
        return False    

    return True

def get_extract_face_photo(userSeq, photoId):
    ## s3 로부터 사진을 받아옴
    file_name = MakeKeyUtil.original_photo(userSeq, photoId)
    public_url = s3_util.generate_public_url(file_name)

    print(public_url)
    
    ## 사진으로부터 얼굴 추출해서 S3 에 저장함
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

    resp = urllib.request.urlopen(public_url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)  # 이미지 디코딩

    faces = detector(image, 1)

    face = faces[0] 

    landmarks = predictor(image, face)
    jaw_points = np.array([[p.x, p.y] for p in landmarks.parts()[0:17]])

    (x, y), radius = cv2.minEnclosingCircle(jaw_points)
    center = (int(x), int(y))
    scale_factor = 1
    radius = int(radius * scale_factor)

    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    cv2.circle(mask, center, radius, 255, -1)

    image_rgba = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)

    image_rgba[:, :, 3] = mask

    top_left_x = max(center[0] - radius, 0)
    top_left_y = max(center[1] - radius, 0)
    bottom_right_x = min(center[0] + radius, image.shape[1] - 1)
    bottom_right_y = min(center[1] + radius, image.shape[0] - 1)

    cropped_image = image_rgba[top_left_y:bottom_right_y, top_left_x:bottom_right_x]

    is_success, buffer = cv2.imencode(".png", cropped_image)
    if not is_success: 
        return False

    io_buf = io.BytesIO(buffer)

    file_name = MakeKeyUtil.extract_photo(userSeq, photoId) + ".png"
    upload_success = s3_util.upload_fileobj(io_buf, file_name) 

    return True
