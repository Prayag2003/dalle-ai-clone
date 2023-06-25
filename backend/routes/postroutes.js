import express from "express";
import { v2 as cloudinary } from "cloudinary"
import * as dotenv from "dotenv"

import Post from "../mongoDB/models/post.js"

dotenv.config();
const router = express.Router();

// Cloudinary

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
)

// GET ALL POSTS
router.route("/").get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})

// CREATE A POST
router.route("/").post(async (req, res) => {

    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        // create a new post in the database
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({ success: true, data: newPost })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err });
    }
})
export default router;