import Image from "next/image";
import Logo from "@/public/logo.svg";
import Settings from "@/public/settings.svg";
import Link from "next/link";

export default function Header() {
  return (
    <header className="font-mono text-xl flex justify-between">
      <Image src={Logo} alt="Logo" />
      <Link href="settings">
        <Image src={Settings} alt="Logo" />
      </Link>
    </header>
  );
}
