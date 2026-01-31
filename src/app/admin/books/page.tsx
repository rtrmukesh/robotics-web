// app/admin/books/page.tsx
"use client";

import { useState } from "react";
import { Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye } from "lucide-react";

export default function AdminBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  

  // Sample books data
  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", price: "$12.99", status: "Published", sales: 1245 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", price: "$14.99", status: "Published", sales: 1892 },
    { id: 3, title: "1984", author: "George Orwell", category: "Dystopian", price: "$10.99", status: "Draft", sales: 0 },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", price: "$11.99", status: "Published", sales: 876 },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fiction", price: "$13.99", status: "Published", sales: 654 },
    { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", price: "$15.99", status: "Published", sales: 2310 },
    { id: 7, title: "Moby-Dick", author: "Herman Melville", category: "Adventure", price: "$16.99", status: "Archived", sales: 432 },
    { id: 8, title: "War and Peace", author: "Leo Tolstoy", category: "Historical", price: "$19.99", status: "Published", sales: 321 },
  ];

  const categories = ["all", "Fiction", "Dystopian", "Romance", "Fantasy", "Adventure", "Historical"];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Book Management</h1>
          <p className="text-gray-500 mt-2">Manage your book catalog and inventory</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Plus size={18} />
            <span>Add New Book</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gray-50 p-4 rounded-xl border">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search books by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{book.title}</p>
                      <p className="text-sm text-gray-500">ID: {book.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{book.author}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{book.price}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      book.status === 'Published' ? 'bg-green-100 text-green-800' :
                      book.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {book.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{book.sales.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye size={18} className="text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit size={18} className="text-blue-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 size={18} className="text-red-500" />
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

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-4">
        {books.slice(0, 3).map((book) => (
          <div key={book.id} className="bg-white border rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{book.title}</h3>
                <p className="text-gray-500 text-sm">{book.author}</p>
              </div>
              <button className="p-1">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {book.category}
              </span>
              <span className="font-medium">{book.price}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                book.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {book.status}
              </span>
              <span className="text-sm text-gray-500">{book.sales} sales</span>
            </div>
          </div>
        ))}
        <button className="w-full py-3 text-center text-blue-600 font-medium border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50">
          View All Books
        </button>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-4">
        <p className="text-gray-500 text-sm mb-4 sm:mb-0">
          Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">124</span> books
        </p>
        <div className="flex space-x-2">
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`px-3 py-2 border rounded-lg ${num === 1 ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}
            >
              {num}
            </button>
          ))}
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
}