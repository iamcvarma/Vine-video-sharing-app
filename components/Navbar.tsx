import React from 'react'
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
        <div>
          search
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