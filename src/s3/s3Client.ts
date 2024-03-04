import { ENVConfig } from '../config/env.config';
import { S3Client } from '@aws-sdk/client-s3';

// https://github.com/aws/aws-sdk-net/issues/1713
export const s3Client = new S3Client({
  region: ENVConfig.AWS_REGION,
  credentials: {
    accessKeyId: ENVConfig.S3_ACCESS_KEY_ID as string,
    secretAccessKey: ENVConfig.S3_SECRET_ACCESS_KEY as string,
  },
});
