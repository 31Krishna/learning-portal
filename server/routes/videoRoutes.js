import express from "express";

import {
  createVideo,
  getVideos,
  getVideo,
} from "../controllers/videoController.js";

const router = express.Router();

router.post("/", createVideo);

router.get("/", getVideos);

router.get("/:id", getVideo);

export default router;