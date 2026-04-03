
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-500 shadow-md p-6 hidden md:block">
      <nav className="space-y-4">
        <Link href="/" className="block p-2 rounded font-medium text-white hover:bg-gray-200 hover:text-black">
          Home
        </Link>

        <Link href="/dashboard" className="block p-2 rounded font-medium text-white hover:bg-gray-200 hover:text-black ">
          Dashboard
        </Link>

        <Link href="/dashboard/users" className="block p-2 rounded font-medium text-white hover:bg-gray-200 hover:text-black">
          Users
        </Link>

        <Link href="/dashboard/profile" className="block p-2 rounded font-medium text-white hover:bg-gray-200 hover:text-black">
          Profile
        </Link>

        <Link href="/about" className="block p-2 rounded font-medium text-white hover:bg-gray-200 hover:text-black">
          About
        </Link>
      </nav>
    </aside>
  );
}
