import express from "express";
import {
  createBookmark,
  getBookmarks,
  deleteBookmark,
  updateBookmark,
} from "../controllers/bookmarkController.js";



const router = express.Router();

router.post("/", createBookmark);

router.get("/:videoId", getBookmarks);

router.put("/:id", updateBookmark);

// ✅ Delete Bookmark
router.delete("/:id", deleteBookmark);

export default router;