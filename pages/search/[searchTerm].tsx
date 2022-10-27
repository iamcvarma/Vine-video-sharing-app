import React, { isValidElement, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "../../utils";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import useAuthStore from "../../store/authStore";
import UserCard from "../../components/UserCard";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { allUsers } = useAuthStore();
  const { searchTerm }: any = router.query;
  const accounts = isAccounts ? "border-b-2 border-black " : "text-gray-400";
  const video = !isAccounts ? "border-b-2 border-black " : "text-gray-400";
  const searchedUsers = allUsers.filter((user: IUser) =>
    user.userName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${video}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16 flex flex-col">
          {searchedUsers.length > 0 ? (
            searchedUsers.map((user: IUser, idx: number) => (
              <div className="w-full border-b-2 p-2 md:p-4 border-gray-200">
                <UserCard user={user} key={idx} />
              </div>
            ))
          ) : (
            <NoResults text={`No Results for ${searchTerm}`} comment />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length > 0 ? (
            videos.map((video: Video, idx: number) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
