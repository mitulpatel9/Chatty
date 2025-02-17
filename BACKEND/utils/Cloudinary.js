const { v2 } = require("cloudinary")

const cloudinary = v2
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLUDINARY_API_KEY,
    api_secret: process.env.CLUDINARY_API_SECRET
});

module.exports = cloudinary;