
import React from 'react'
import { auth } from '../_lib/auth'

export const metadata={
    title:"Account"
}

export default async function page() {
  const session= await auth();
  const name= session?.user?.name.split(" ").at(0);
  return (
    <h1 className="font-semibold text-2xl text-accent-400 mb-4">Welcome, {name}</h1>
  )
}
