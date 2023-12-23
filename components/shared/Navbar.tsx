import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex self-center gap-10">
            <Link href="list">List</Link>
            <Link href="/">Home</Link>
            <Link href="exercise">Exercise</Link>
        </div>
    )
}