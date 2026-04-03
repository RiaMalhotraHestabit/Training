export default function AboutPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">About This Project
      </h1>
      <div className="mt-4 bg-white p-4 rounded-lg shadow w-full max-w-3xl">
      <p className="mt-2 display-block text-gray-700">
        This dashboard represents an internal analytics system used by a fictional organization to monitor business performance,
        revenue trends, and user activity in real time. It is designed to help stakeholders make quick, data-driven decisions through clear visual insights.
      </p>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Built using Next.js App Router and Tailwind CSS.
      </p>
    </main>
  );
}
