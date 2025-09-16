// // src/components/reelsComponents/ReelVideoPlayer.jsx
// import React, { useEffect, useRef } from "react";

// const ReelVideoPlayer = ({ reel, videoRef }) => {
//   const internalVideoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = React.useState(true);
//   const [isMuted, setIsMuted] = React.useState(false);

//   // Use the passed videoRef or fallback to internal ref
//   const currentVideoRef = videoRef || internalVideoRef;

//   useEffect(() => {
//     const video = currentVideoRef.current;
//     if (video) {
//       // Enable sound by default
//       video.muted = false;
//       video.volume = 0.7; // Set volume to 70%
//       setIsMuted(false);
      
//       // Auto-play when component mounts
//       video.play().catch(console.error);
//     }
//   }, [currentVideoRef]);

//   const handleVideoClick = () => {
//     const video = currentVideoRef.current;
//     if (video) {
//       if (video.paused) {
//         video.play();
//         setIsPlaying(true);
//       } else {
//         video.pause();
//         setIsPlaying(false);
//       }
//     }
//   };

//   return (
//     <div className="w-full h-full relative bg-black rounded-lg overflow-hidden">
//       <video
//         ref={currentVideoRef}
//         src={reel.videoUrl}
//         autoPlay
//         loop
//         playsInline
//         className="w-full h-full object-cover cursor-pointer"
//         poster={reel.thumbnail}
//         preload="metadata"
//         onClick={handleVideoClick}
//       >
//         Your browser does not support the video tag.
//       </video>
      
//       {/* Play/Pause Overlay */}
//       {!isPlaying && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
//           <div className="w-16 h-16 bg-transparent bg-opacity-20 rounded-full flex items-center justify-center">
//             <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M8 5v14l11-7z"/>
//             </svg>
//           </div>
//         </div>
//       )}

  
//     </div>
//   );
// };

// export default ReelVideoPlayer;
import React, { useEffect, useRef, useState } from "react";

const ReelVideoPlayer = ({ reel, videoRef }) => {
  const internalVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // prefer external ref if provided
  const currentRef = videoRef || internalVideoRef;

  // try autoplay on mount / when URL changes
  useEffect(() => {
    const video = currentRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        // autoplay might be blocked — still fine, wait for user interaction
        console.warn("Autoplay prevented:", err);
        setIsPlaying(false);
      }
    };

    tryPlay();
  }, [reel.videoUrl, currentRef]);

  // sync state with play/pause events (keeps overlay accurate)
  useEffect(() => {
    const video = currentRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [currentRef, reel.videoUrl]);

  const handleVideoClick = async () => {
    const video = currentRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        // play event will update isPlaying; set here as fallback
        setIsPlaying(true);
      } catch (err) {
        console.error("Play failed:", err);
      }
    } else {
      video.pause();
      // pause event will update isPlaying; set here as fallback
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full h-full relative bg-black rounded-lg overflow-hidden">
      <video
        ref={currentRef}
        src={reel.videoUrl}
        autoPlay
        loop
        playsInline
        // muted
        className="w-full h-full object-cover cursor-pointer"
        poster={reel.thumbnail}
        preload="metadata"
        onClick={handleVideoClick} // video click still works when overlay not present
      />

      {/* Pause overlay: now clickable to resume */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-transparent cursor-pointer"
          onClick={handleVideoClick} // <-- important: overlay resumes playback
        >
          <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelVideoPlayer;
