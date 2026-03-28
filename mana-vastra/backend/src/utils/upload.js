import multer from "multer";
import cloudinary, { isCloudinaryConfigured } from "../config/cloudinary.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024,
  },
});

const toDataUri = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

export const uploadImagesToCloudinary = async (files = []) => {
  if (!files.length) {
    return [];
  }

  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured in backend/.env");
  }

  const uploads = files.map(async (file) => {
    const response = await cloudinary.uploader.upload(toDataUri(file), {
      folder: "mana-vastra",
      transformation: [{ width: 800, crop: "limit", quality: "auto:good" }],
    });

    return {
      publicId: response.public_id,
      url: response.secure_url,
    };
  });

  return Promise.all(uploads);
};

export const deleteCloudinaryImages = async (images = []) => {
  if (!isCloudinaryConfigured) {
    return;
  }

  const publicIds = images.map((image) => image.publicId).filter(Boolean);
  if (!publicIds.length) {
    return;
  }

  await Promise.all(publicIds.map((publicId) => cloudinary.uploader.destroy(publicId)));
};
