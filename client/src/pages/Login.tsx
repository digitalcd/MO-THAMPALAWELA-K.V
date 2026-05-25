import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Design Philosophy: Educational Excellence with Sri Lankan Heritage
 * - Matches the main website's royal blue (#002366) and gold (#ffcc00) color scheme
 * - Fjalla One for headings, Bubbler One for body text
 * - Professional, secure appearance with smooth animations
 * - Email capture for login tracking
 */

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  const CORRECT_PASSWORD = '123Tkv!@#$';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Validate password
    if (!password) {
      setError('Please enter your password');
      setLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check password
    if (password === CORRECT_PASSWORD) {
      // Use auth context to login
      login(email);
      
      setLoginSuccess(true);
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        setLocation('/');
      }, 2000);
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-4xl font-bold text-blue-900">KV</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Mo/Thampalawela k.v</h1>
            <p className="text-yellow-400 font-semibold">Login Page</p>
          </div>

          {/* Form Content */}
          <div className="px-8 py-8">
            {loginSuccess ? (
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Welcome!</h2>
                <p className="text-gray-600 mb-2">Successfully logged in as:</p>
                <p className="text-lg font-semibold text-blue-900 break-all mb-4">{email}</p>
                <p className="text-sm text-gray-500">Redirecting to home page...</p>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 transition-colors bg-gray-50 hover:bg-white"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Your email will be recorded for login tracking</p>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-900 transition-colors bg-gray-50 hover:bg-white pr-12"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-900 transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 animate-shake">
                    <p className="text-red-700 text-sm font-semibold flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      {error}
                    </p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      Login
                    </>
                  )}
                </button>

                {/* Info Section */}
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-900">
                  <p className="text-xs text-gray-600 text-center">
                    <span className="font-semibold text-blue-900">Demo Access:</span> Use any email and the provided password to access the portal.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
            <p className="text-xs text-gray-600">
              © 2024 Mo/Thampalawela K.V. School. All rights reserved.
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white hover:text-yellow-400 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
