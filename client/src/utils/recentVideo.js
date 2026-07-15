export const saveRecentVideo = (video) => {

  let videos =
    JSON.parse(localStorage.getItem("recent")) || [];

  videos = videos.filter((v) => v._id !== video._id);

  videos.unshift(video);

  videos = videos.slice(0, 5);

  localStorage.setItem(
    "recent",
    JSON.stringify(videos)
  );

};