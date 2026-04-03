import Image from "next/image";
import { users } from "@/data/users";

export default function ProfilePage() {
  const user = users[0]; // mock logged-in user

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="max-w-6xl mx-auto space-y-4">

        {/*back button*/}
        <a
          href="/dashboard"
          className="text-sm text-blue-600 hover:underline inline-block"
        >
          ← Go back
        </a>

        {/* Main Profile Card */}
        <div className="bg-white border rounded-lg shadow-sm">

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            
            {/* Left: Image */}
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/user1.png"
                alt="Profile"
                width={480}
                height={280}
                className="rounded-md object-cover"
              />
            </div>

            {/* Middle: Basic Info */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-sm font-medium text-gray-900">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Job Title</p>
                <p className="text-sm text-gray-900">
                  {user.role}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-blue-600">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Right: Social Links */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">LinkedIn</p>
                <a className="text-sm text-blue-600 hover:underline">
                  linkedin.com
                </a>
              </div>

              <div>
                <p className="text-xs text-gray-500">Twitter</p>
                <a className="text-sm text-blue-600 hover:underline">
                  x.com
                </a>
              </div>

              <div>
                <p className="text-xs text-gray-500">Facebook</p>
                <a className="text-sm text-blue-600 hover:underline">
                  facebook.com
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Bio Section */}
          <div className="p-6 space-y-2">
            <p className="text-xs text-gray-500">Bio</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Passionate frontend developer focused on building clean,
              responsive user interfaces. Experienced with React,
              Next.js, and Tailwind CSS, and enjoys creating intuitive
              design systems.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Footer */}
          <div className="p-4">
            <a className="text-sm text-blue-600 hover:underline">
              Edit Profile
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
