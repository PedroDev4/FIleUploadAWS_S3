import { S3Storage } from "../utils/S3Storage";

class DeleteImageService {

    async execute(filename: string): Promise<void> {
        const s3Storage = new S3Storage();
        await s3Storage.deleteFile(filename);
    }

}

export { DeleteImageService };