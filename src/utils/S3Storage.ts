import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import multerConfig from '../config/multer';
import * as stream from 'stream';
import fs from 'fs';
import { getType } from 'mime';
import { resolve } from 'path';

class S3Storage {

    private client: S3;

    constructor() {
        const accessKeyId = String(process.env.AWS_ACCESS_KEY);
        const secretAccessKey = String(process.env.AWS_SECRET_ACCESS_KEY);
        this.client = new aws.S3({
            region: "us-east-1",
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });
    }

    async saveFile(filename: string): Promise<void> {
        const originalPath = path.resolve(multerConfig.directory, filename);
        const contentType = mime.getType(originalPath);
        console.log(contentType);

        if (!contentType) {
            throw new Error("File not found");
        }

        const fileContent = await fs.promises.readFile(originalPath);
        const bucketName = String(process.env.AWS_BUCKET_NAME);
        console.log(bucketName);

        this.client.putObject({
            Bucket: bucketName,
            Key: filename,
            ACL: "public-read",
            Body: fileContent,
            ContentType: contentType,
        }).promise();

        await fs.promises.unlink(originalPath);
    }

    async uploadVideo(filename: string): Promise<string> {
        const originalPath = resolve(multerConfig.directory, filename);
        const passThrough = new stream.PassThrough();

        const videoStream = fs.createReadStream(originalPath).pipe(passThrough);

        const bucketName = String(process.env.AWS_BUCKET_NAME);
        console.log(bucketName);

        this.client.putObject({
            Bucket: bucketName,
            Key: filename,
            ACL: 'public-read',
            Body: videoStream,
            ContentType: "MP4/GIF"
        });

        const fileBucketURL = `https://${bucketName}.s3.amazonaws.com/${filename}`;
        return fileBucketURL;
    }

    async deleteFile(filename: string): Promise<void> {

        this.client.deleteObject({
            Bucket: "mybucketuploadapi",
            Key: filename
        }).promise();

    }

}

export { S3Storage };