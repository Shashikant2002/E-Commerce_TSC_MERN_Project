import { rm } from "fs";

export const deleteImage = (path: string) => {
  rm(path, () => {
    console.log("Image Deleted on Error !!");
  });
};
