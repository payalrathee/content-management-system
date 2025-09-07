const storagePublic = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/public");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const uploadPublic = multer({ storage: storagePublic });

const storagePrivate = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/uploads/private");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const uploadPrivate = multer({ storage: storagePrivate });

export {
    uploadPublic,
    uploadPrivate
}
