import React from 'react'
import {footerList1,footerList2,footerList3} from '../utils/constants'

const Link = ({items,mt}:{items:string[],mt:boolean}) => (
    <div className={`flex flex-wrap gap-2 ${mt?"mt-5":""}`}>
            {items.map((item)=>(
                <p className='text-gray-400 text-sm hover:underline cursor-pointer' key = {item}>
                    {item}
                </p>
            ))}
        </div>
)

function Footer() {
  return (
    <div className='mt-6 hidden xl:block'>
        <Link items={footerList1} mt={false}/>
        <Link items={footerList2} mt={true}/>
        <Link items={footerList3} mt = {true}/>
        <p className='text-gray-400 text-sm mt-5'>2022 TikTik (By Chaitanya Varma)</p>
    </div>
  )
}

export default Footer