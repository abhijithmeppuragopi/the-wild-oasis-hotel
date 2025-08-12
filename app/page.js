import React from 'react';
import Image from 'next/image';
import bg3 from '@/public/bg3.jpg'


export default function page() {
    return (
        <main className="mt-24">
          <Image src={bg3} fill className='object-cover' alt="Mountains and forests with two cabins" />
          <div className="relative z-10 text-center">
            <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
              Welcome to paradise.
            </h1>
            <a
              href="/cabins"
              className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore luxury cabins
            </a>
          </div>
        </main>
      );
}
