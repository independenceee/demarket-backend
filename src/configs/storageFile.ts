import multer, { StorageEngine } from "multer";

const storageFile = function (): StorageEngine {
    const storage: StorageEngine = multer.diskStorage({
        destination: function (request, response, callback) {
            callback(null, `public`);
        },
        filename: function (request, file, callback) {
            callback(null, Date.now().toString + "-" + file.originalname);
        },
    });

    return storage;
};

export default storageFile;
