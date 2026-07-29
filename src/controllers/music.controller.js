const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
    try {
        const { title } = req.body;
        const file = req.file;

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (req.user.role !== "artist") {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        if (!file) {s
            return res.status(400).json({
                message: "Music file is required"
            });
        }

        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id,
        });

        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            },
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = { createMusic };