import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import Image from "next/image";

export default async function Navigation() {
  const session=await auth();
  const user=session?.user;
  const isLoggedIn = !!user;
  const userName = user?.name || "Guest";
  const userImage = user?.image || "/images/default-user.png";
  console.log(userImage);
  console.log(userName);
  console.log(isLoggedIn);
 
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <a href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-accent-400 transition-colors">
            About
          </a>
        </li>
        <li >
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex flex-dir-row gap-2 items-center"
          >
            {isLoggedIn ? (<>
              <Image src={userImage} referrerPolicy="no-referrer" width={20} height={20} alt={userName} className="w-10 h-10 rounded-full" />
              <span className="ml-2">{userName}</span>
              </>
            ) : (
              <span className="text-primary-100">Login</span>
            )}
            
          </Link>
        </li>
      </ul>
    </nav>
  );
}
