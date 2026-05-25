import { useState, useEffect } from 'react';
import { Upload, Edit2, X, Plus, Mail, Phone, BookOpen, LogOut, Menu, X as CloseIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

/**
 * Design Philosophy: Educational Excellence with Sri Lankan Heritage
 * - Matches the main website's royal blue (#002366) and gold (#ffcc00) color scheme
 * - Professional teacher profiles with photo management
 * - Responsive grid layout for teacher cards
 * - Photo upload and display functionality
 */

interface Teacher {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  email: string;
  phone: string;
  experience: string;
  bio: string;
  photo: string | null;
}

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { logout, userEmail } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };
  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    subject: '',
    qualification: '',
    email: '',
    phone: '',
    experience: '',
    bio: '',
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Load teachers from localStorage on mount
  useEffect(() => {
    const savedTeachers = localStorage.getItem('schoolTeachers');
    if (savedTeachers) {
      try {
        setTeachers(JSON.parse(savedTeachers));
      } catch (e) {
        console.error('Error loading teachers:', e);
      }
    }
  }, []);

  // Save teachers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('schoolTeachers', JSON.stringify(teachers));
  }, [teachers]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, photo: base64String });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTeacher = () => {
    if (formData.name && formData.subject && formData.email) {
      const newTeacher: Teacher = {
        id: editingId || Date.now().toString(),
        name: formData.name || '',
        subject: formData.subject || '',
        qualification: formData.qualification || '',
        email: formData.email || '',
        phone: formData.phone || '',
        experience: formData.experience || '',
        bio: formData.bio || '',
        photo: formData.photo || null,
      };

      if (editingId) {
        setTeachers(teachers.map(t => t.id === editingId ? newTeacher : t));
        setEditingId(null);
      } else {
        setTeachers([...teachers, newTeacher]);
      }

      resetForm();
      setIsAddingTeacher(false);
    }
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setFormData(teacher);
    setPhotoPreview(teacher.photo);
    setEditingId(teacher.id);
    setIsAddingTeacher(true);
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      qualification: '',
      email: '',
      phone: '',
      experience: '',
      bio: '',
      photo: null,
    });
    setPhotoPreview(null);
    setEditingId(null);
  };

  const handleCancel = () => {
    resetForm();
    setIsAddingTeacher(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full h-20 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center">
        <div className="w-11/12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center" style={{backgroundColor: '#060dcb', borderColor: '#244094'}}>
              <span className="text-2xl font-bold text-blue-900">KV</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-sm" style={{fontSize: '19px'}}>Mo/Thampalawela k.v</h2>
              <p className="text-yellow-400 text-xs"></p>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-white font-bold text-sm uppercase items-center">
            <li><a href="/" className="hover:text-yellow-400 transition-colors">Home</a></li>
            <li><a href="/teachers" className="text-yellow-400">Teachers</a></li>
            <li className="text-xs text-yellow-300">{userEmail}</li>
            <li><button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2"><LogOut size={16} />Logout</button></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-blue-900/95 backdrop-blur-md md:hidden flex flex-col items-center py-8 gap-6 text-white font-bold uppercase shadow-2xl animate-fade-in">
            <a href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Home</a>
            <a href="/teachers" onClick={() => setIsMenuOpen(false)} className="text-yellow-400">Teachers</a>
            <div className="text-xs text-yellow-300 lowercase">{userEmail}</div>
            <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2"><LogOut size={18} />Logout</button>
          </div>
        )}
      </nav>

      {/* Header */}
      <div className="pt-32 pb-12 bg-gradient-to-r from-blue-900 to-blue-800 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Our Teaching Staff</h1>
        <p className="text-xl text-yellow-400">Dedicated Educators Committed to Excellence</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Add Teacher Button */}
        {!isAddingTeacher && (
          <button
            onClick={() => setIsAddingTeacher(true)}
            className="mb-8 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={20} />
            Add New Teacher
          </button>
        )}

        {/* Add/Edit Teacher Form */}
        {isAddingTeacher && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              {editingId ? 'Edit Teacher' : 'Add New Teacher'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Photo Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-blue-900 mb-3">Teacher Photo</label>
                <div className="flex gap-6">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-900 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                  </div>
                  {photoPreview && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-blue-300">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  placeholder="Enter teacher's full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., Mathematics, English"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., B.Sc., M.A."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., 10 years"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  placeholder="teacher@school.edu.lk"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  placeholder="+94 (0) 55 222 XXXX"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-blue-900 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  placeholder="Brief biography and teaching philosophy"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddTeacher}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                {editingId ? 'Update Teacher' : 'Add Teacher'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Teachers Grid */}
        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow border-t-4 border-blue-900">
                {/* Photo */}
                {teacher.photo ? (
                  <div className="w-full h-64 overflow-hidden bg-gray-200">
                    <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <BookOpen size={64} className="text-blue-300" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">{teacher.name}</h3>
                  <p className="text-lg font-semibold text-yellow-600 mb-4">{teacher.subject}</p>

                  {teacher.qualification && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-bold">Qualification:</span> {teacher.qualification}
                    </p>
                  )}

                  {teacher.experience && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-bold">Experience:</span> {teacher.experience}
                    </p>
                  )}

                  {teacher.bio && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{teacher.bio}</p>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
                    {teacher.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail size={16} className="text-blue-900" />
                        <a href={`mailto:${teacher.email}`} className="hover:text-blue-900 transition-colors">
                          {teacher.email}
                        </a>
                      </div>
                    )}
                    {teacher.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone size={16} className="text-blue-900" />
                        <a href={`tel:${teacher.phone}`} className="hover:text-blue-900 transition-colors">
                          {teacher.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTeacher(teacher)}
                      className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(teacher.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <X size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-2xl text-gray-600 font-semibold mb-4">No teachers added yet</p>
            <p className="text-gray-500 mb-6">Click "Add New Teacher" to start building your staff directory</p>
            <button
              onClick={() => setIsAddingTeacher(true)}
              className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all mx-auto"
            >
              <Plus size={20} />
              Add First Teacher
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-6 mt-16">
        <p className="text-sm">© 2024 Mo/Thampalawela K.V. School. All rights reserved.</p>
      </footer>
    </div>
  );
}
