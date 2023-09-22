"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { UserList } from "@/app/components/UserList";
import { columns } from "@/app/components/dataTable/columns"


export default function Home() {
  const [data, setData] = useState([])
 
  
    useEffect(() => {
      setInterval(() => {
      fetch('/api/winners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(async (res) => {
       const winners = await  res.json()
       setData(winners)
      }
       )
      }, 3000)
    }, [])
  let i = 0;
    return (
   
        <UserList data={data} columns={columns}/>
      
  );
};