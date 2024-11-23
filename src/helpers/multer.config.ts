import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

const allowedFileType = ['image/jpeg', 'image/png'];
const maxFileSize = 0.5 * 1024 * 1024; // 5 mb file size

export const multerOptions = {
    storage: diskStorage({
        destination: './static/uploads', // Destination folder for uploaded files
        filename: (req, file, callback) => {
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = file.originalname.split('.').pop();
            callback(null, uniqueSuffix + '.' + extension);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (allowedFileType.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new BadRequestException('Invalid file type'), false);
        }
    },
    limits: {
        fileSize: maxFileSize,
    },
};
