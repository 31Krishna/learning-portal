import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";
import Footer from "../components/Footer";

function Home() {
    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await api.get("/videos");
            setVideos(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredVideos = videos.filter((video) =>
        video.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-100">

                {/* Hero */}

                <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 py-16">

                    <div className="mx-auto max-w-7xl px-6">

                        <h1 className="text-6xl font-extrabold text-white">
                            Learn Anytime.
                        </h1>

                        <p className="mt-4 text-xl text-indigo-100">
                            Continue learning with your bookmarked lessons.
                        </p>
                    </div>

                </div>

                <div className="mx-auto max-w-7xl px-6 py-10">

                    {/* Search */}

                    <input
                        type="text"
                        placeholder="🔍 Search videos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-10 w-full rounded-xl border bg-white p-4 shadow-sm outline-none focus:border-blue-500"
                    />

                    {loading ? (
                        <div className="flex h-80 items-center justify-center">

                            <div className="text-center">

                                <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                                <p className="mt-5 text-lg font-semibold text-gray-700">
                                    Loading videos...
                                </p>

                            </div>

                        </div>
                    ) : filteredVideos.length === 0 ? (
                        <div className="rounded-xl bg-white p-16 text-center shadow">

                            <p className="text-6xl">📚</p>

                            <h2 className="mt-4 text-2xl font-bold">
                                No videos found
                            </h2>

                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                            {filteredVideos.map((video) => (
                                <Link
                                    key={video._id}
                                    to={`/video/${video._id}`}
                                    className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="h-56 w-full object-cover"
                                    />

                                    <div className="p-6">

                                        <div className="mb-3 flex items-center justify-between">

                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                                                🎥 Video
                                            </span>

                                            <span className="text-sm text-gray-500">
                                                {Math.floor(video.duration / 60)} min
                                            </span>

                                        </div>

                                        <h2 className="text-2xl font-bold">
                                            {video.title}
                                        </h2>

                                        <p className="mt-3 text-gray-600">
                                            {video.description}
                                        </p>

                                        <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                                            ▶ Continue Learning
                                        </button>

                                    </div>
                                </Link>
                            ))}

                        </div>
                    )}

                </div>

            </div>
        </>
    );
}

export default Home;