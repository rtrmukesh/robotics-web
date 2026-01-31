// app/admin/page.tsx - Dashboard
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  BarChart3,
  Calendar
} from "lucide-react";

export default function AdminDashboard() {
  // Stats cards data
  const stats = [
    { title: "Total Users", value: "1,234", icon: <Users size={24} />, change: "+12%", color: "blue" },
    { title: "Total Books", value: "5,678", icon: <BookOpen size={24} />, change: "+8%", color: "green" },
    { title: "Revenue", value: "$45,678", icon: <DollarSign size={24} />, change: "+23%", color: "purple" },
    { title: "Active Users", value: "892", icon: <TrendingUp size={24} />, change: "+5%", color: "orange" },
  ];

  // Recent activities
  const activities = [
    { user: "John Doe", action: "added new book", time: "2 min ago" },
    { user: "Jane Smith", action: "updated profile", time: "15 min ago" },
    { user: "Mike Johnson", action: "purchased premium", time: "1 hour ago" },
    { user: "Sarah Wilson", action: "left a review", time: "2 hours ago" },
    { user: "Alex Brown", action: "registered", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2">Welcome back! Here&apos;s what&apos;s happening with your platform.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <div className={`text-${stat.color}-600`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200 shadow-sm h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
                <button className="text-sm text-blue-600 hover:text-blue-700">View Details</button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-72 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 size={48} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would appear here</p>
                  <p className="text-sm text-gray-400">Monthly active users and revenue trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div>
          <Card className="border border-gray-200 shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-medium text-sm">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.action}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-center text-blue-600 hover:text-blue-700 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50">
                View All Activities
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                <p className="text-xl font-bold text-gray-900 mt-1">3 Events</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="text-purple-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
                <p className="text-xl font-bold text-gray-900 mt-1">24 Reviews</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <BookOpen className="text-orange-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">System Health</p>
                <p className="text-xl font-bold text-green-600 mt-1">98%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}