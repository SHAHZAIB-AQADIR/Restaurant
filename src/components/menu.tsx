'use client';
import React, {useState} from "react";
import Image from "next/image";
// import { url } from "inspector";
// import { title } from "process";
import Link from "next/link";
import CartIcon from "./CartIcon";
const links = [
    { id: 21, title: "HomePage", url: "/" },
    { id: 22, title: "Menu", url: "/menu" },
    { id: 23, title: "Working Hours", url: "/" },
    { id: 24, title: "Contact", url: "/" },
  ];
  

const Menu =() => {
    const[open,setOpen]=useState(false);


    const user=false
    return(
        <div>{
           !open ?(
            <Image src="/open.png.png" alt="" width={20} height={20} onClick={()=>setOpen(true)}/>
           ) :(
            <Image src="/close.png.png" alt="" width={20} height={20} onClick={()=>setOpen(false)}/>
           )}
        { open &&(
           <div className="bg-red-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 z-10 items-center justify-center text-3xl">
            {links.map(item=>(
                <Link href={item.url} key={item.id} onClick={()=> setOpen(false)} >{item.title}</Link>
            ))}
            {!user ?(
                 <Link href="/login" onClick={()=> setOpen(false)}>Login</Link>
            ):(
            <Link href="/order" onClick={()=> setOpen(false)}>Order</Link>
            )}
            <Link href="/cart" onClick={()=> setOpen(false)}></Link>
            <CartIcon/>
           </div>
)}
        </div>
        );
};
export default Menu