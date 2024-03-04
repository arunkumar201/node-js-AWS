import { ENVConfig } from '../config/env.config';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './s3Client';

export async function uploadObject(
  file: Buffer,
  fileName: string,
) {
  console.log('uploading file to s3');
  console.log(fileName);
  console.log(file);
  console.log(ENVConfig.S3_BUCKET_NAME);

  const command = new PutObjectCommand({
    Bucket:ENVConfig.S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
  });

  await s3Client.send(command);
}
