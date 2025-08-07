import boto3
import os 
from dotenv import load_dotenv
load_dotenv()


# configure session and client
session = boto3.session.Session()
client = session.client(
    's3',
    region_name='blr1',
    endpoint_url='https://blr1.digitaloceanspaces.com',
    aws_access_key_id=os.getenv('DO_bucket_access_key_id'),
    aws_secret_access_key=os.getenv('DO_SECRET_ACCESS_KEY'),
)

# create new bucket
# client.create_bucket(Bucket='test3')

# upload file
with open('z.txt', 'rb') as file_contents:
    client.put_object(
        Bucket='djangoblog-bucket',
        Key='z.txt',
        Body=file_contents,
    )

# download file
# client.download_file(
#     Bucket='your-bucket-name',
#     Key='test.txt',
#     Filename='tmp/test.txt',
# )