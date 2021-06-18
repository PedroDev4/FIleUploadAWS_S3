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
    console.log(file.mimetype);
    console.log(file.originalname);

    return response.send();

});

routes.delete("/:filename", async (request, response) => {
    const { filename } = request.params;

    const deleteImagesService = new DeleteImageService();
    await deleteImagesService.execute(filename);

    return response.send();

});

export { routes };