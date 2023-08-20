"use client"
import {useSession, signOut} from 'next-auth/react'

function DashboardPage() {
  const {data: session, status} = useSession()
  console.log(session, status)
  return (
    <div className='flex flex-col items-center '><h1 className=''> Profile</h1>
    <pre>{
      JSON.stringify({session, status}, null, 2)}
    </pre>
    <button className='bg-blue-600 py-2 px-3' onClick={()=>{
      signOut();
    }}>Logout</button>
    </div>
  )}

  export default DashboardPage

