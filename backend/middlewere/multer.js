const multer = require('multer');
const stream = require('stream');
require("dotenv").config()

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,     
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_url : process.env.CLOUDINARY_URL
});

// Function to create multer upload middleware
const createMulterUpload = () => {
  // Set up Multer storage in memory
  const storage = multer.memoryStorage();
  console.log("this is upload");
  // Create multer upload instance for single file
  return multer({ storage: storage }).single('image'); // 'image' matches the form input name
};

// Helper function to upload file buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  console.log("this is cloudinary");
  return new Promise((resolve, reject) => {
    console.log("before cloud");
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'uploads', // Optional: specify a folder in Cloudinary
        resource_type: 'auto', // Automatically detect file type
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Write the buffer to the upload stream
    const readableStream = new stream.PassThrough();
    readableStream.end(buffer);
    readableStream.pipe(uploadStream);
  });
};

// Middleware to process images and upload to Cloudinary
const processimages = async (req, res, next) => {
  req.mediaData = [];
  console.log("this is precess");
  
  try {
    if (!req.file) {
      next();
      return;
    }

    const buffer = req.file.buffer;

    // Upload file to Cloudinary
    const result = await uploadToCloudinary(buffer);

    // Push the Cloudinary URL to req.mediaData
    req.url=result.secure_url

    console.log("req media data", req.mediaData);
    next();
  } catch (err) {
    console.error("Error processing images", err);
    res.status(500).send("Error processing images");
  }
};

// Export both functions
module.exports = {
  createMulterUpload,
  processimages,
};
