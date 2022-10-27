import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {GoogleLogin,googleLogout} from '@react-oauth/google'
import {AiOutlineLogin, AiOutlineLogout ,AiOutlineCloudUpload}from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import {IoMdAdd} from 'react-icons/io'
import Logo from '../utils/tiktik-logo.png'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore';


const Navbar = () => {
  const {userProfile ,addUser,removeUser}  = useAuthStore()
  const [searchValue,setSearchValue] = useState('')
  const router = useRouter();

  const handleSearch = (e:{preventDefault:()=>void})=>{
    e.preventDefault();
    if (searchValue){
      router.push(`/search/${searchValue}`)
    }
  }
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
        <Link href="/">
            <div className='w-[100px] md:w-[130px]'>
                <Image 
                className='cursor-pointer'
                src={Logo}
                alt="tiktok"
                layout='responsive' 
                />
            </div>
        </Link>
        <div className='relative hidden md:block'>
          <form
          onClick={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
          >
            <input 
            type="text" 
            value={searchValue} 
            onChange={(e)=>{setSearchValue(e.target.value)}}
            placeholder="Search videos and accounts"
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-500 w-[300px] md:w-[550px] rounded-full md:top-0 hover:border-gray-500 hover:border-2'
            />
            <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400 hover:text-gray-600'
            >
              <BiSearch />
            </button>
          </form>
        </div>
        <div>{userProfile?(
            <div className='flex gap-5 md:gap-10'>
              <Link href={"/upload"}>
              <button className='flex gap-2 items-center justify-center text-md rounded-full font-semibold border-2 px-2 md:p-3'>
              <AiOutlineCloudUpload color='hotpink'/>
              </button>
              </Link>
              {userProfile.image && (
                <div className="w-6 h-6 md:w-10 md:h-10 cursor-pointer">
                <Link href="/">
                  <div>
                    <Image
                      width={30}
                      height={30}
                      className="rounded-full"
                      src={userProfile.image}
                      alt="Profile photo"
                      layout="responsive"
                    />
                  </div>
                </Link>
              </div>
              )}
              <button 
              type='button'
              className='px-2'
              onClick={()=>{
                googleLogout();
                removeUser();
              }}
              >
                  <AiOutlineLogout color='hotpink' fontSize={20}/>
              </button>
            </div>
        ):
          (<GoogleLogin 
          onSuccess={(res)=>createOrGetUser(res,addUser)}
          onError={()=>console.log('error')}
          />)}
        </div>
    </div>
  )
}

export default Navbar