import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import multerConfig from '../config/multer';
import fs from 'fs';

class S3Storage {

    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: "us-east-1",
        });
    }

    async saveFile(filename: string): Promise<void> {
        const originalPath = path.resolve(multerConfig.directory, filename);
        const contentType = mime.getType(originalPath);
        console.log(originalPath);

        if (!contentType) {
            throw new Error("File not found");
        }

        const fileContent = await fs.promises.readFile(originalPath);

        this.client.putObject({
            Bucket: "mybucketuploadapi",
            Key: filename,
            ACL: "public-read",
            Body: fileContent,
            ContentType: contentType,
        }).promise();

        await fs.promises.unlink(originalPath);
    }

}

export { S3Storage };