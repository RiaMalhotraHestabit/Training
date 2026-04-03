"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, DollarSign, Briefcase, CheckCircle } from "lucide-react";

/* ---------- Mock Data ---------- */

const kpiData = [
  {
    title: "Total Users",
    value: "1,245",
    icon: Users,
    bg: "bg-blue-500",
  },
  {
    title: "Revenue",
    value: "$34,560",
    icon: DollarSign,
    bg: "bg-green-500",
  },
  {
    title: "Projects",
    value: "18",
    icon: Briefcase,
    bg: "bg-yellow-500",
  },
  {
    title: "Tasks Completed",
    value: "76%",
    icon: CheckCircle,
    bg: "bg-red-500",
  },
];

const areaChartData = [
  { day: "Mon", revenue: 1200 },
  { day: "Tue", revenue: 2100 },
  { day: "Wed", revenue: 1800 },
  { day: "Thu", revenue: 2600 },
  { day: "Fri", revenue: 3200 },
  { day: "Sat", revenue: 2800 },
  { day: "Sun", revenue: 3500 },
];

const barChartData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 600 },
  { month: "Mar", users: 750 },
  { month: "Apr", users: 900 },
  { month: "May", users: 1100 },
];

const usersData = [
  { id: 1, name: "Alice Johnson", email: "alice@mail.com", role: "UI/UX Designer" },
  { id: 2, name: "Michael Lee", email: "michael@mail.com", role: "Full Stack Developer" },
  { id: 3, name: "Sofia Martinez", email: "sofia@mail.com", role: "Product Manager" },
  { id: 4, name: "David Kim", email: "david@mail.com", role: "Administrator" },
];

/* ---------- Dashboard ---------- */

export default function DashboardPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="w-full bg-gray-200 p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 text-sm">
          Real-time overview of your application
        </p>
      </div>

      {/*KPI CARDS*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`${item.bg} text-white p-5 rounded-xl shadow flex items-center justify-between`}
            >
              <div>
                <p className="text-sm opacity-90">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
              <Icon size={32} className="opacity-80" />
            </div>
          );
        })}
      </div>

      {/*CHARTS*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Area Chart */}
        <Card>
          <h2 className="font-semibold mb-4">Weekly Revenue</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  fill="#93c5fd"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar Chart */}
        <Card>
          <h2 className="font-semibold mb-4">Monthly User Growth</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/*USERS LIST*/}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="font-semibold">Recent Users</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-1 text-sm w-full sm:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
}
