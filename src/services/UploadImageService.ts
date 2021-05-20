import { S3Storage } from '../utils/S3Storage';


class UploadImageService {

    async execute(file: Express.Multer.File): Promise<void> {
        // Usar forEach para uploadMany

        const s3Storage = new S3Storage();

        await s3Storage.saveFile(file.filename)
    }

}

export { UploadImageService };