import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { IUser } from "../types";

const UserCard = ({user}:{user:IUser}) => {
  return (
      <Link href={`/profile/${user._id}`}>
        <div className="flex items-start gap-3">
          <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
            <div className="w-8 h-8">
              <Image
                src={user.image}
                width={34}
                height={34}
                className="rounded-full"
                alt="user profile image"
                layout="responsive"
              />
            </div>
            <div className="hidden xl:block">
              <p className="flex gap-1 items-center text-md font-bold lowercase text-primary">
                {user.userName.replaceAll(" ", "")}
                <GoVerified className="text-blue-400" />
              </p>
              <p className="capitilize text-gray-400 text-xs">
                {user.userName}
              </p>
            </div>
          </div>
        </div>
      </Link>
      );
};

export default UserCard;
