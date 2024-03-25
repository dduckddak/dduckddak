import boto3
import os
from dotenv import load_dotenv
from botocore.exceptions import NoCredentialsError

# 환경 변수 로드
load_dotenv()

class S3Util:
    def __init__(self, bucket_name):
        self.bucket_name = bucket_name
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
	        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        )
    
    def upload_file(self, file_name, object_name):
        try:
            self.s3.upload_file(file_name, self.bucket_name, object_name)
            return True
        except NoCredentialsError:
            print("Credentials not available")
            return False
        
    def upload_fileobj(self, file_name, object_name):
        try:
            self.s3.upload_fileobj(file_name, self.bucket_name, object_name)
            return True
        except Exception as e:
            print(f"Upload failed: {e}")
            return False

    def download_file(self, object_name, file_name):
        try:
            self.s3.download_file(self.bucket_name, object_name, file_name)
            return True
        except NoCredentialsError:
            print("Credentials not available")
            return False
        
    def generate_public_url(self, object_key):
        return f"https://{self.bucket_name}.s3.amazonaws.com/{object_key}"
