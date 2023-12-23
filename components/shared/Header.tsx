import Image from "next/image";
import Logo from "@/public/logo.svg";
import Settings from "@/public/settings.svg";

export default function Header() {
  return (
    <header className="font-mono text-xl flex justify-between">
      <Image src={Logo} alt="Logo" />
      <button>
        <Image src={Settings} alt="Logo" />
      </button>
    </header>
  );
}
