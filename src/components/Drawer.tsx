// components/book-modal-drawer.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  X, 
  Upload, 
  BookOpen, 
  User, 
  FileText, 
  DollarSign, 
  Image as ImageIcon,
  Check,
  Trash2,
  XCircle
} from "lucide-react";

interface BookData {
  id?: string;
  title: string;
  author: string;
  description: string;
  price: string;
  selectedBook: string;
  file: File | null;
  previewUrl?: string;
}

interface BookModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookData) => void;
  initialData?: BookData | null;
}

export default function BookModalDrawer({ 
  isOpen, 
  onClose, 
  onSubmit,
  initialData 
}: BookModalDrawerProps) {
  const [formData, setFormData] = useState<BookData>({
    title: "",
    author: "",
    description: "",
    price: "",
    selectedBook: "",
    file: null,
    previewUrl: ""
  });

  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        description: initialData.description || "",
        price: initialData.price || "",
        selectedBook: initialData.selectedBook || "",
        file: initialData.file || null,
        previewUrl: initialData.previewUrl || ""
      });
    }
  }, [initialData]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ 
        ...prev, 
        file, 
        previewUrl 
      }));
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ 
        ...prev, 
        file, 
        previewUrl 
      }));
    } else {
      setErrors(prev => ({ ...prev, file: "Please upload an image or PDF file" }));
    }
  }, []);

  const removeFile = useCallback(() => {
    if (formData.previewUrl) {
      URL.revokeObjectURL(formData.previewUrl);
    }
    setFormData(prev => ({ ...prev, file: null, previewUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [formData.previewUrl]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (isNaN(parseFloat(formData.price))) newErrors.price = "Price must be a valid number";
    if (!formData.selectedBook) newErrors.selectedBook = "Please select a book type";
    if (!formData.file) newErrors.file = "Please upload a file";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      price: "",
      selectedBook: "",
      file: null,
      previewUrl: ""
    });
    setErrors({});
    setIsDragging(false);
  };

  if (!isOpen) return null;

  // Sample book types
  const bookTypes = [
    { id: "fiction", label: "Fiction" },
    { id: "non-fiction", label: "Non-Fiction" },
    { id: "academic", label: "Academic" },
    { id: "biography", label: "Biography" },
    { id: "children", label: "Children's" },
    { id: "sci-fi", label: "Science Fiction" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`fixed z-50 bg-white shadow-2xl transition-all duration-300 ease-in-out
          ${isMobile ? 
            'inset-x-0 bottom-0 top-16 rounded-t-3xl' : 
            'top-0 right-0 h-full md:w-1/2 lg:w-5/12 xl:w-4/12 rounded-l-3xl'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {initialData ? "Edit Book" : "Add New Book"}
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-1">
                {isMobile ? "Fill in book details" : "Complete the form to add a new book to your collection"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close drawer"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="h-[calc(100%-80px)] overflow-y-auto px-6 py-6 md:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <BookOpen size={16} className="mr-2" />
                Book Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter book title"
                className={`w-full px-4 py-3.5 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all
                  ${errors.title ? 
                    'border-red-500 focus:ring-red-200' : 
                    'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm flex items-center">
                  <XCircle size={14} className="mr-1" /> {errors.title}
                </p>
              )}
            </div>

            {/* Author Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <User size={16} className="mr-2" />
                Author Name *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
                className={`w-full px-4 py-3.5 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all
                  ${errors.author ? 
                    'border-red-500 focus:ring-red-200' : 
                    'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
              />
              {errors.author && (
                <p className="text-red-500 text-sm flex items-center">
                  <XCircle size={14} className="mr-1" /> {errors.author}
                </p>
              )}
            </div>

            {/* Price Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <DollarSign size={16} className="mr-2" />
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className={`w-full pl-10 pr-4 py-3.5 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all
                    ${errors.price ? 
                      'border-red-500 focus:ring-red-200' : 
                      'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm flex items-center">
                  <XCircle size={14} className="mr-1" /> {errors.price}
                </p>
              )}
            </div>

            {/* Book Type Selection */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <BookOpen size={16} className="mr-2" />
                Book Type *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {bookTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, selectedBook: type.id }))}
                    className={`px-4 py-3.5 border rounded-xl text-center transition-all flex items-center justify-center
                      ${formData.selectedBook === type.id ? 
                        'bg-blue-50 border-blue-500 text-blue-700' : 
                        'border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <span className="font-medium">{type.label}</span>
                    {formData.selectedBook === type.id && (
                      <Check size={16} className="ml-2 text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
              {errors.selectedBook && (
                <p className="text-red-500 text-sm flex items-center">
                  <XCircle size={14} className="mr-1" /> {errors.selectedBook}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FileText size={16} className="mr-2" />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={isMobile ? 4 : 5}
                placeholder="Enter book description..."
                className={`w-full px-4 py-3.5 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 resize-none transition-all
                  ${errors.description ? 
                    'border-red-500 focus:ring-red-200' : 
                    'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm flex items-center">
                  <XCircle size={14} className="mr-1" /> {errors.description}
                </p>
              )}
            </div>

            {/* File Upload Section */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <ImageIcon size={16} className="mr-2" />
                Book Cover / File *
              </label>
              
              {formData.file ? (
                // File Preview
                <div className="border-2 border-dashed border-green-200 bg-green-50 rounded-2xl p-6 text-center">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                        {formData.file.type.startsWith('image/') ? (
                          <img 
                            src={formData.previewUrl} 
                            alt="Preview" 
                            className="w-16 h-16 object-cover rounded-xl"
                          />
                        ) : (
                          <FileText size={24} className="text-green-600" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900 truncate max-w-[200px]">
                          {formData.file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(formData.file.size / 1024).toFixed(2)} KB
                        </p>
                        <p className="text-xs text-green-600 font-medium mt-1">
                          ✓ File uploaded successfully
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl flex items-center space-x-2 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span>Remove File</span>
                    </button>
                  </div>
                </div>
              ) : (
                // File Drop Zone
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer
                    ${isDragging ? 
                      'border-blue-500 bg-blue-50' : 
                      errors.file ? 
                        'border-red-300 bg-red-50' : 
                        'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                      <Upload size={28} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Drop your file here or <span className="text-blue-600">browse</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Supports JPG, PNG, PDF • Max 10MB
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                </div>
              )}
              
              {errors.file && !formData.file && (
                <p className="text-red-500 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" /> {errors.file}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className={`pt-6 border-t border-gray-200 sticky bottom-0 bg-white ${
              isMobile ? 'pb-20' : 'pb-6'
            }`}>
              <div className="flex flex-col-reverse md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full md:w-1/3 px-6 py-3.5 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full md:w-2/3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  {initialData ? "Update Book" : "Add Book to Library"}
                </button>
              </div>
              
              {/* Helper Text */}
              <p className="text-center text-gray-500 text-sm mt-4">
                All fields marked with * are required
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile bottom padding */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-40" />
      )}
    </>
  );
}