import { request, response, Router } from 'express';
import { UploadImageService } from '../services/UploadImageService';
import { DeleteImageService } from '../services/DeleteImageService';
import multerConfig from '../config/multer';
import multer from 'multer';

const routes = Router();
const upload = multer(multerConfig);

routes.post("/", upload.single('file'), async (request, response) => {
    const { file } = request;

    const uploadImagesService = new UploadImageService();
    await uploadImagesService.execute(file);

    return response.send();

});

routes.delete("/:filename", async (request, response) => {

    // TODO

});

export { routes };