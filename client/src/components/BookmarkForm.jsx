import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { formatTime } from "../utils/time";

function BookmarkForm({ currentTime, videoId, fetchBookmarks }) {
  const [bookmarkName, setBookmarkName] = useState("");
  const [loading, setLoading] = useState(false);

  const addBookmark = async () => {
    const name = bookmarkName.trim();

    if (!name) {
      toast.error("Please enter a bookmark name.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/bookmarks", {
        videoId,
        name,
        timestamp: Math.floor(currentTime),
      });

      toast.success("Bookmark saved successfully!");

      setBookmarkName("");

      await fetchBookmarks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save bookmark.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-lg">

      <h2 className="mb-5 text-2xl font-bold text-gray-800">
        📌 Add Bookmark
      </h2>

      <div className="mb-5 rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-gray-600">
          Current Time
        </p>

        <p className="text-2xl font-bold text-blue-600">
          {formatTime(Math.floor(currentTime))}
        </p>
      </div>

      <input
        type="text"
        placeholder="Enter bookmark name..."
        value={bookmarkName}
        onChange={(e) => setBookmarkName(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <button
        onClick={addBookmark}
        disabled={loading}
        className={`mt-5 w-full rounded-lg px-5 py-3 font-semibold text-white transition ${
          loading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Saving..." : "💾 Save Bookmark"}
      </button>

    </div>
  );
}

export default BookmarkForm;