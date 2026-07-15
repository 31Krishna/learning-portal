import toast from "react-hot-toast";
import api from "../services/api";
import { formatTime } from "../utils/time";
import Swal from "sweetalert2";

function BookmarkList({
    bookmarks,
    videoRef,
    fetchBookmarks,
}) {

    const deleteBookmark = async (id) => {

        const result = await Swal.fire({
            title: "Delete Bookmark?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#2563eb",
            confirmButtonText: "Yes, Delete",
        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/bookmarks/${id}`);

            toast.success("Bookmark deleted successfully");

            fetchBookmarks();

        } catch (err) {

            console.error(err);

            toast.error("Unable to delete bookmark");

        }

    };
    const resumeVideo = (timestamp) => {

        if (!videoRef.current) return;

        videoRef.current.currentTime = timestamp;

        videoRef.current.play();

        toast.success(`Resumed at ${formatTime(timestamp)}`);

    };

    const editBookmark = async (bookmark) => {

        const newName = prompt(
            "Edit Bookmark Name",
            bookmark.name
        );

        if (!newName) return;

        try {

            await api.put(`/bookmarks/${bookmark._id}`, {
                name: newName,
            });

            toast.success("Bookmark Updated");

            fetchBookmarks();

        } catch (err) {

            toast.error("Unable to update bookmark");

        }

    };

    return (

        <div className="mt-8 rounded-xl bg-white p-6 shadow-lg">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-gray-800">
                    📚 Bookmarks
                </h2>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {bookmarks.length}
                </span>

            </div>

            {bookmarks.length === 0 ? (

                <div className="rounded-lg border border-dashed p-10 text-center">

                    <p className="text-5xl">📌</p>

                    <p className="mt-4 text-gray-500">
                        No bookmarks yet
                    </p>

                </div>

            ) : (

                bookmarks.map((bookmark) => (

                    <div
                        key={bookmark._id}
                        className="mb-4 flex items-center justify-between rounded-xl border p-4 transition hover:shadow-md"
                    >

                        <div>

                            <h3 className="font-semibold text-gray-800">
                                {bookmark.name}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {formatTime(bookmark.timestamp)}
                            </p>

                        </div>

                        <div className="flex gap-2">

                            <button
                                onClick={() => resumeVideo(bookmark.timestamp)}
                                className="rounded-lg bg-green-600 px-4 py-2 text-white"
                            >
                                ▶
                            </button>

                            <button
                                onClick={() => editBookmark(bookmark)}
                                className="rounded-lg bg-yellow-500 px-4 py-2 text-white"
                            >
                                ✏
                            </button>

                            <button
                                onClick={() => deleteBookmark(bookmark._id)}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white"
                            >
                                🗑
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default BookmarkList;