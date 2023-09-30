import multer from "multer";
import storageFile from "../configs/storageFile";

const UploadFile = function (root: string) {
    return multer({
        storage: storageFile(root),
    });
};

export default UploadFile;
