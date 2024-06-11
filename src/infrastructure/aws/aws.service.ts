import { BadRequestException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

@Injectable()
export class AwsService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
      region: 'ap-northeast-2',
    });
  }

  async fileUploadToS3(fileName: string, file: Express.Multer.File) {
    const extension = file.originalname.split('.').pop();

    if (
      extension != 'pdf' &&
      extension != 'hwp' &&
      extension != 'hwpx' &&
      extension != 'doc' &&
      extension != 'docx'
    ) {
      throw new BadRequestException('File extension must be a valid format');
    }

    const params: PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: file.buffer,
      ContentType: 'application/octet-stream',
    };

    const data = await this.s3.upload(params).promise();

    return data.Location;
  }
}
