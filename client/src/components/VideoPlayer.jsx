import { forwardRef } from "react";

const VideoPlayer = forwardRef(
  ({ video, setCurrentTime, setDuration }, ref) => {
    return (
      <div className="overflow-hidden rounded-2xl bg-black shadow-xl">

        <video
          ref={ref}
          controls
          controlsList="nodownload"
          disablePictureInPicture
          className="w-full"

          onLoadedMetadata={(e) => {
            setDuration(e.target.duration);
          }}

          onTimeUpdate={(e) => {
            setCurrentTime(e.target.currentTime);
          }}
        >
          <source
            src={video.videoUrl}
            type="video/mp4"
          />

          Your browser does not support video playback.

        </video>

      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;