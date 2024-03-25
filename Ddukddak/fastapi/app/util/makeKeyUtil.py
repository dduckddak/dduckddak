class MakeKeyUtil:

    @staticmethod
    def extract_photo(user_seq: int, photo_id: int) -> str:
        return f"{user_seq}/photo/extract/{photo_id}"
    
    @staticmethod
    def original_photo(user_seq: int, photo_id: int) -> str:
        return f"{user_seq}/photo/original/{photo_id}"

