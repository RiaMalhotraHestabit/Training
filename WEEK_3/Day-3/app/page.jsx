
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Landing Page",
  description: "Welcome to our Next.js SaaS Dashboard Application",
  keywords: "Next.js, SaaS, Dashboard, Responsive, Tailwind CSS",
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">

      <div className="flex-grow">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
            Build Your Dashboard Fast
          </h1>
          <p className="text-gray-600 text-center max-w-xl mb-6">
            A modern SaaS dashboard built with Next.js and Tailwind CSS. Fully responsive and optimized for performance.
          </p>

          <Image
            src="/images/hero.png"
            alt="SaaS dashboard preview"
            width={600}
            height={400}
            className="rounded-lg shadow-lg max-w-full h-auto"
            priority
          />

          <div className="flex gap-4 mt-6 flex-wrap justify-center">
            <Link
              href="/about"
              className="px-6 py-2 text-xl text-blue-600 hover:text-blue-800 hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 text-xl text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Go to Dashboard
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="my-12 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <Image src="/images/feature1.png" width={80} height={80} alt="Fast Performance" />
            <h3 className="text-xl font-semibold mt-4">Fast Performance</h3>
            <p className="text-gray-600 mt-2">
              Optimized for speed, your dashboard loads in milliseconds.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <Image src="/images/feature2.png" width={80} height={80} alt="Responsive Design" />
            <h3 className="text-xl font-semibold mt-4">Responsive Design</h3>
            <p className="text-gray-600 mt-2">
              Looks perfect on desktop, tablet, and mobile devices.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <Image src="/images/feature3.png" width={80} height={80} alt="Secure & Reliable" />
            <h3 className="text-xl font-semibold mt-4">Secure & Reliable</h3>
            <p className="text-gray-600 mt-2">
              Built with best practices in security and performance.
            </p>
          </div>

        </section>

        {/* Testimonials Section */}
        <section className="my-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <Image
                src="/images/user1.png"
                width={80}
                height={80}
                alt="User 1"
                className="rounded-full mx-auto"
              />
              <p className="text-gray-600 mt-4">
                “This dashboard is amazing! It saved me hours of work every week.”
              </p>
              <h3 className="font-semibold mt-4">Alice Johnson</h3>
              <p className="text-sm text-gray-500">Product Manager</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <Image
                src="/images/user2.png"
                width={80}
                height={80}
                alt="User 2"
                className="rounded-full mx-auto"
              />
              <p className="text-gray-600 mt-4">
                “Super fast and easy to use. Highly recommend to any SaaS team.”
              </p>
              <h3 className="font-semibold mt-4">Michael Lee</h3>
              <p className="text-sm text-gray-500">Developer</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <Image
                src="/images/user3.png"
                width={80}
                height={80}
                alt="User 3"
                className="rounded-full mx-auto"
              />
              <p className="text-gray-600 mt-4">
                “Beautiful design and smooth performance. My team loves it.”
              </p>
              <h3 className="font-semibold mt-4">Sofia Martinez</h3>
              <p className="text-sm text-gray-500">Designer</p>
            </div>

          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto flex justify-center px-6">
          <p className="text-sm">&copy; 2026 RM Ria Malhotra. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
