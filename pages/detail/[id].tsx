import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();
  const [comment,setComment] = useState('')
  const [isPostingComment,setIsPostingComment] = useState(false)
  
  
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({...post,likes:data.likes})
    }
  };

  const addComment = async (e:any) =>{
      e.preventDefault();
      if (userProfile && comment){
        const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`,{
          userId:userProfile._id,
          comment, 
        })

        setPost(post=>({...post,comments:data.comments}))
        setComment('')
        setIsPostingComment(false)
      }
  }


  function onVideoPress() {
    if (isPlaying) {
      setIsPlaying(false);
      videoRef?.current?.pause();
    } else {
      setIsPlaying(true);
      videoRef?.current?.play();
    }
  }
  if (!post) return null;
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white dark:bg-dblack flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p
            className="cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative ">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={onVideoPress}
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!isPlaying && (
              <button>
                <BsFillPlayFill
                  className="text-white text-6xl lg:text-8xl"
                  onClick={onVideoPress}
                />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 right-5 lg:bottom-10 lg:right-10">
          {isVideoMuted ? (
            <button>
              <HiVolumeOff
                onClick={() => {
                  setIsVideoMuted(false);
                }}
                className="text-white text-2xl lg:text-4xl"
              />
            </button>
          ) : (
            <button>
              <HiVolumeUp
                onClick={() => {
                  setIsVideoMuted(true);
                }}
                className="text-white text-2xl lg:text-4xl"
              />
            </button>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="mt-10 lg:mt-20">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
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
                <div className="flex flex-col mt-3 gap-2">
                  <p className="flex gap-2 items-center ms:text-md font-bold text-primary dark:text-white">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium  text-xs text-gray-500 hidden md:block ">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <p className="px-10 text-lg text-gray-600 dark:text-white">{post.caption}</p>
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
          comments ={post.comments} 
          comment={comment}
          setComment={setComment}
          addComment = {addComment}
          isPostingComment = {isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};
