"use client"
import axios, {AxiosError} from "axios"
import { FormEvent, useState } from "react"
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation"
function LoginPage() {

  const [error, setError] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
      const res = await signIn('credentials', {email: formData.get('email'), password: formData.get('password'),
      redirect: false})
      console.log(res)
      if(res?.error){
        return setError(res.error as string)
      }
      if(res?.ok) return router.push('/dashboard')
    
  }
    return (
      <div className="flex justify-center mt-40">
        <form className="flex flex-col gap-5 bg-neutral-950 px-5 py-10" onSubmit={handleSubmit}>
          {error && <div className="bg-red-500 text-white p-2 mb-2"> 
            {error}
            </div>}
          <h1 className="text-center">Singin</h1>
          <input className="bg-zinc-800 px-4 py-2 block mb-2"  type="email" placeholder="someemal@gmail.com" name = "email" />
          <input className="bg-zinc-800 px-4 py-2 block mb-2"  type="password" placeholder="******" name = "password" />
          <button className="bg-blue-500 px-4 py-2">Login</button>
        </form>
      </div>
    )
  }
  
  export default LoginPage