import { Video } from "../types";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function onVideoPress() {
    if (isPlaying) {
      setIsPlaying(false);
      videoRef?.current?.pause();
    } else {
      setIsPlaying(true);
      videoRef?.current?.play();
    }
  }
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <div>
                <Image
                  width={60}
                  height={60}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="Profile photo"
                  layout="responsive"
                />
              </div>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center ms:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium  text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl flex justify-center"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <Link href="/">
            <video
              loop
              ref={videoRef}
              className="h-[300px] w-[200px] cursor-pointer rounded-xl bg-gray-100 md:h=[400px] lg:w-[600px] lg:h-[530px]"
              src={post.video.asset.url}
            ></video>
          </Link>
          {isHover && (
            <div className="absolute w-[40%] bottom-0 height=[20px] flex justify-evenly items-center">
              {isPlaying ? (
                <button>
                  <BsFillPauseFill
                    className="text-black text-2xl lg:text-4xl"
                    onClick={onVideoPress}
                  />
                </button>
              ) : (
                <button>
                  <BsFillPlayFill
                    className="text-black text-2xl lg:text-4xl"
                    onClick={onVideoPress}
                  />
                </button>
              )}
                {isVideoMuted ? (
                <button>
                  <HiVolumeOff 
                  onClick={()=>{setIsVideoMuted(false)}} 
                  className="text-black text-2xl lg:text-4xl" 
                   />
                </button>
              ) : (
                <button>
                  <HiVolumeUp 
                   onClick={()=>{setIsVideoMuted(true)}} 
                  className="text-black text-2xl lg:text-4xl" />
                </button>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
