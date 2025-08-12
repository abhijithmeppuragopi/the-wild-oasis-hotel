import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import ReservationCard from "./_components/ReservationCard";
import { ReservationProvider } from "./_components/ReservationContext";
import './_styles/globals.css';
import {Josefin_Sans} from 'next/font/google';

export const metadata={
  title:{
    template:"%s / The wild oasis",
    default:"Welcome / The wild oasis"
  },
  description:'Luxorious hotel in the middle of Kerala',
}
const josefin=Josefin_Sans({
  subsets:['latin'],
  display:'swap'
});


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`bg-primary-950 text-primary-100 min-h-screen flex flex-col ${josefin.className}`}>
      <Header/>
      <div className="flex-1 px-6 py-6 ">
      <main className="max-w-7xl m-auto w-full">
      <ReservationProvider>
        {children}
      </ReservationProvider>  
      </main> 
      </div>  
      </body>

    </html>
    
  );
}
