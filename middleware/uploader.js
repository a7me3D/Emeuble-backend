const cloudinary = require('cloudinary').v2;
require('dotenv').config();

module.exports.uploadFile = async (fileName, filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  const file = await cloudinary.uploader.upload(filePath, async (result) => result);
  return file.url;
};