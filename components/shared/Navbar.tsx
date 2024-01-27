import { Button, Navbar, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/public/logo.svg";
import Settings from "@/public/settings.svg";

// export default function Navbar() {
//     const pathName = usePathname();
//     console.log(pathName)
//     return (
//         <div className="flex self-center gap-10">
//             <Link href="list">
//                 <Button placeholder="List" variant={pathName == '/list' ? 'filled' : 'text'}>List</Button>
//             </Link>
//             <Link href="/"><Button placeholder="List" variant={pathName == '/' ? 'filled' : 'text'}>Home</Button></Link>
//             <Link href="exercise"><Button placeholder="List" variant={pathName == '/exercise' ? 'filled' : 'text'}>Exercise</Button></Link>
//         </div>
//     )
// }

import React from "react";
import Image from "next/image";

const NavbarDefault = () => {
  const pathName = usePathname();
  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll mb-24">
      <Navbar
        placeholder="Navbar"
        className="max-w-full container flex items-center justify-between text-blue-gray-900"
      >
        <div className="flex gap-5">
          <Image src={Logo} alt="Logo" />
          <Typography placeholder="Language Cards">Language Cards</Typography>
        </div>
        <div className="flex self-center gap-10">
          <Link href="list">
            <Button
              placeholder="List"
              variant={pathName == "/list" ? "filled" : "text"}
            >
              List
            </Button>
          </Link>
          <Link href="/">
            <Button
              placeholder="List"
              variant={pathName == "/" ? "filled" : "text"}
            >
              Home
            </Button>
          </Link>
          <Link href="exercise">
            <Button
              placeholder="List"
              variant={pathName == "/exercise" ? "filled" : "text"}
            >
              Exercise
            </Button>
          </Link>
        </div>
        <Link href="settings">
          <Image src={Settings} alt="Logo" />
        </Link>
      </Navbar>
    </div>
  );
};

export default NavbarDefault;
