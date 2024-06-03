import multer from "multer";
import ShortUniqueId from "short-unique-id";

const storage = multer.diskStorage({
  destination(req, file, callBack) {
    callBack(null, "uploads");
  },
  filename(req, file, callBack) {
    // @ts-ignore
    const uid = new ShortUniqueId({ length: 10 });
    const uinqueId = `${uid.rnd().toLowerCase()}`;
    callBack(null, `${uinqueId}.${file.originalname.split(".").pop()}`);
  },
});

export const singleUpload = multer({
  storage: storage,
}).single("photo");
