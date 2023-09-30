import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
    destination: function (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback,
    ): void {
        callback(null, `public`);
    },

    filename: function (
        request: Request,
        file: Express.Multer.File,
        callback: FileNameCallback,
    ): void {
        callback(null, Date.now() + "-" + file.originalname);
    },
});

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
): void => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};
const UploadFile = multer({
    storage: storage,
    // fileFilter: fileFilter,
});

export default UploadFile;
