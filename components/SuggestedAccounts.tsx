import React ,{ useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore';  
import {IUser} from '../types'
import UserCard from './UserCard';

function SuggestedAccounts() {
  const {fetchAllUsers,allUsers} = useAuthStore();

  useEffect(()=>{
    fetchAllUsers();
  },[fetchAllUsers])


  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold hidden xl:block m-3 mt-4'>Suggested Accounts</p>
      <div>
        {allUsers.slice(0,6).map((user:IUser)=>(
          <UserCard user ={user}/>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts