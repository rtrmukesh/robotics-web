"use client";

import Loader from "@/src/components/Loader";
import { UserList } from "@/src/helper/DataTypes";
import Role from "@/src/helper/Role";
import ArrayList from "@/src/lib/ArrayList";
import { formatDateTime } from "@/src/lib/DateTime";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Filter, Mail, MoreVertical, Search, UserPlus, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(0);

const { data: userList, isLoading, refetch } = useQuery<UserList[]>({
  queryKey: ["users", selectedRole],
  queryFn: async () => {
      const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (selectedRole !== 0) params.append("role_id", selectedRole.toString());
    const res = await fetch(`/api/users${(searchQuery || selectedRole !== 0) ? `?${params.toString()}` : ''}`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },
  
});

const debounceRefetch = useMemo(
  () => debounce(() => refetch(), 500),
  [refetch]
);

useEffect(() => {
  return () => debounceRefetch.cancel();
}, [debounceRefetch]);

if(isLoading){
  return <Loader label="Loading Users..." color="" />;
}

  const roles = [
    {
      label: "All",
      value: 0,
    },
    {
      label: "Admin",
      value: 2,
    },
    {
      label: "User",
      value: 1,
    }
  ];




  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-500 mt-2">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
            <UserPlus size={18} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Active Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">892</p>
          <p className="text-sm text-green-600">+8% from last month</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending Verification</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">42</p>
          <p className="text-sm text-orange-600">Requires attention</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">New Users Today</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">18</p>
          <p className="text-sm text-blue-600">+2 from yesterday</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gray-50 p-4 rounded-xl border">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                debounceRefetch();
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => {
                  setSelectedRole(role.value);
                  refetch();
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedRole === role.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ArrayList.isArray(userList) &&
                userList.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="font-bold text-white text-sm">
                            {user?.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          {/* <p className="text-sm text-gray-500">ID: {user.id}</p> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail size={14} className="text-gray-400" />
                          <p className="text-gray-900 text-sm">{user.email}</p>
                        </div>
                        {/* <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-gray-400" />
                        <p className="text-gray-900 text-sm">{user?.phone}</p>
                      </div> */}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          user.role_id === Role.ADMIN
                            ? "bg-purple-100 text-purple-800"
                            : user.role_id === Role.USER
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role_id === Role.ADMIN
                          ? Role.ADMIN_TEXT
                          : user.role_id === Role.USER
                            ? Role.USER_TEXT
                            : "Guest"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {user.is_active === true ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : user.is_active === false ? (
                          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                        <span
                          className={`font-medium ${
                            user.is_active === true
                              ? "text-green-700"
                              : user.is_active === false
                                ? "text-orange-700"
                                : "text-red-700"
                          }`}
                        >
                          {user.is_active === true
                            ? "Active"
                            : user.is_active === false
                              ? "Inactive"
                              : "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">
                        {formatDateTime(user.created_at)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors">
                          Edit
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical size={18} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Users View */}
      <div className="md:hidden space-y-4">
        {ArrayList.isArray(userList) &&
          userList.slice(0, 3).map((user) => (
            <div key={user.id} className="bg-white border rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </div>
                <button className="p-1">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="font-medium">
                    {user.role_id === Role.ADMIN
                      ? Role.ADMIN_TEXT
                      : user.role_id === Role.USER
                        ? Role.USER_TEXT
                        : "Guest"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <div className="flex items-center space-x-1">
                    {user.is_active === true ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <XCircle size={14} className="text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        user.is_active === true
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.is_active === true
                        ? "Active"
                        : user.is_active === false
                          ? "Inactive"
                          : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <button className="w-full py-3 text-center text-blue-600 font-medium border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50">
          View All Users
        </button>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-4">
        <p className="text-gray-500 text-sm mb-4 sm:mb-0">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">8</span> of{" "}
          <span className="font-medium">1,234</span> users
        </p>
        <div className="flex space-x-2">
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`px-3 py-2 border rounded-lg ${num === 1 ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-50"}`}
            >
              {num}
            </button>
          ))}
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}