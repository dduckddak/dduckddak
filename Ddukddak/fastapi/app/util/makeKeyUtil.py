class MakeKeyUtil:

    @staticmethod
    def extract_photo(user_seq: int, photo_id: int) -> str:
        return f"{user_seq}/photo/extract/{photo_id}"
    
    @staticmethod
    def original_photo(user_seq: int, photo_id: int) -> str:
        return f"{user_seq}/photo/original/{photo_id}"
    
    @staticmethod ##책 합성하기 위한 정보
    def book_file(book_id: int) -> str:
        return f"default_book/{book_id}/info.txt"
    
    @staticmethod ##책 합성 없는 그림 경로
    def book_photo_nonblank(book_id: int, page_id: int) -> str:
        return f"default_book/{book_id}/nonblank/{page_id}.png"
    
    @staticmethod ##책 합성 있는 그림 경로
    def book_photo_blank(book_id: int, page_id: int) -> str:
        return f"default_book/{book_id}/blank/{page_id}.png"
    
    @staticmethod ##책 합성한 것을 저장할려는 경로
    def make_book_photo(user_seq: int, generate_id: int , page_id: int) -> str:
        return f"{user_seq}/make-book/{generate_id}/image/{page_id}.png"
    

