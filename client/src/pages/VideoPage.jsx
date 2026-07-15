import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import VideoPlayer from "../components/VideoPlayer";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";
import useProtection from "../hooks/useProtection";

import api from "../services/api";
import { formatTime } from "../utils/time";
import Footer from "../components/Footer";

function VideoPage() {

    useProtection();

    const { id } = useParams();

    const videoRef = useRef(null);

    const [video, setVideo] = useState(null);

    const [bookmarks, setBookmarks] = useState([]);

    const [currentTime, setCurrentTime] = useState(0);

    const [duration, setDuration] = useState(0);

    const [blurVideo, setBlurVideo] = useState(false);

    useEffect(() => {

        const handleVisibility = () => {

            if (document.hidden) {

                setBlurVideo(true);

                videoRef.current?.pause();

            } else {

                setBlurVideo(false);

            }

        };

        document.addEventListener(
            "visibilitychange",
            handleVisibility
        );

        return () =>
            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );

    }, []);

    useEffect(() => {

        fetchVideo();

        fetchBookmarks();

    }, [id]);
    const fetchVideo = async () => {

        try {

            const res = await api.get(`/videos/${id}`);

            setVideo(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    const fetchBookmarks = async () => {

        try {

            const res = await api.get(`/bookmarks/${id}`);

            setBookmarks(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    // Save progress

    useEffect(() => {

        localStorage.setItem(
            `progress-${id}`,
            currentTime
        );

    }, [currentTime, id]);

    // Resume watching

    useEffect(() => {

        if (!video) return;

        const saved = localStorage.getItem(
            `progress-${id}`
        );

        if (
            saved &&
            Number(saved) > 5 &&
            videoRef.current
        ) {
            const resume = window.confirm(
                `Continue watching from ${formatTime(
                    Number(saved)
                )}?`
            );

            if (resume) {

                videoRef.current.currentTime =
                    Number(saved);

                toast.success("Progress Restored");

            }
        }

    }, [video]);

    if (!video)
        return (
            <div className="p-10 text-center">
                Loading...
            </div>
        );
    // saveRecentVideo(res.data.data);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-100">

                <div className="mx-auto grid max-w-7xl gap-8 p-8 lg:grid-cols-3">

                    {/* Left */}

                    <div className="lg:col-span-2">

                        <h1 className="mb-5 text-4xl font-bold">
                            {video.title}
                        </h1>

                        <div className="relative">

                            {/* Watermark */}
                            <div
                                className="
w-full
rounded-2xl
border-0
bg-white
px-6
py-5
shadow-xl
focus:ring-4
focus:ring-indigo-300
"
                            >
                                GVCC Learning Portal
                            </div>

                            {/* Blur Overlay */}
                            {blurVideo && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/70 text-3xl font-bold text-white">
                                    Protected Content
                                </div>
                            )}

                            <VideoPlayer
                                ref={videoRef}
                                video={video}
                                setCurrentTime={setCurrentTime}
                                setDuration={setDuration}
                            />

                        </div>

                        {/* Progress */}

                        <div className="mt-6 rounded-xl bg-white p-6 shadow">

                            <div className="mb-2 flex justify-between">

                                <span className="font-semibold">
                                    Progress
                                </span>

                                <span>
                                    {Math.floor(
                                        (currentTime / duration) * 100
                                    ) || 0}
                                    %
                                </span>

                            </div>

                            <div className="h-3 rounded-full bg-gray-200">

                                <div
                                    className="h-3 rounded-full bg-blue-600 transition-all"
                                    style={{
                                        width: `${(currentTime / duration) *
                                            100 || 0
                                            }%`,
                                    }}
                                />

                            </div>

                            <div className="mt-4 flex justify-between text-sm text-gray-500">

                                <span>
                                    {formatTime(
                                        Math.floor(currentTime)
                                    )}
                                </span>

                                <span>
                                    {formatTime(
                                        Math.floor(duration)
                                    )}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div>

                        <BookmarkForm
                            currentTime={currentTime}
                            videoId={id}
                            fetchBookmarks={fetchBookmarks}
                        />

                        <BookmarkList
                            bookmarks={bookmarks}
                            videoRef={videoRef}
                            fetchBookmarks={fetchBookmarks}
                        />

                    </div>

                </div>

            </div>
        </>
    );
}

export default VideoPage;