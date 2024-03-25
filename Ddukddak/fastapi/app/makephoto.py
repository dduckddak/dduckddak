import cv2
import io
import numpy as np
import urllib.request
import dlib
from util.S3util import S3Util
from schemas import UserPreferences, MakePhoto, ExtractPhoto
from util.makeKeyUtil import MakeKeyUtil

## S3 버킷
s3_util = S3Util('ddukddak')


# def upload_file(userSeq, photoId):
#     file_name = MakeKeyUtil.original_photo(userSeq, photoId)

#     upload_success = s3_util.upload_file('img/1.jpg', file_name) ## 이미지경로, 지정할 이름
#     if upload_success:
#         return True
#     else:
#         return False


# def download_file(userSeq, photoId):
#     file_name = MakeKeyUtil.extract_photo(userSeq, photoId) + ".png"
#     download_success = s3_util.download_file(file_name, "tgt_img/" + file_name)
#     if download_success:
#         return True
#     else:
#         return False

def make_fairytale_photo(userSeq, photoId):
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

    face = faces[0] # 사진 속 얼굴이 1개밖에 없음

    landmarks = predictor(image, face)
    jaw_points = np.array([[p.x, p.y] for p in landmarks.parts()[0:17]])

    (x, y), radius = cv2.minEnclosingCircle(jaw_points)
    center = (int(x), int(y))
    scale_factor = 0.9  
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

    # cv2.imwrite('tgt_img/final_image.png', cropped_image)

    # file_name = MakeKeyUtil.extract_photo(userSeq, photoId)
    # upload_success = s3_util.upload_file(cropped_image, file_name) 

    is_success, buffer = cv2.imencode(".png", cropped_image)
    if not is_success: 
        return False
    
    # 바이트 스트림으로 변환
    io_buf = io.BytesIO(buffer)

    file_name = MakeKeyUtil.extract_photo(userSeq, photoId) + ".png"
    upload_success = s3_util.upload_fileobj(io_buf, file_name) 

    return True
