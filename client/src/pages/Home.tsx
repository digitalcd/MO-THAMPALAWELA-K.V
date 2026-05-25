import { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Phone, Mail, LogOut, Menu, X as CloseIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

/**
 * Design Philosophy: Educational Excellence with Sri Lankan Heritage
 * - Royal Blue (#002366) + Gold (#ffcc00) color scheme
 * - Fjalla One for display, Bubbler One for body
 * - Dynamic hero slider with school imagery
 * - Smooth animations and hover effects
 */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, userEmail } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  const slides = [
    {
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663626262975/EcoTZJc5va3xT2s5HSYQv9/hero-school-building-cjQdANQY6j2kbXCmQLQzbH.webp',
      title: 'Mo/Thampalawela K.V. School',
      tagline: 'Nurturing Excellence Since 1968'
    },
    {
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663626262975/EcoTZJc5va3xT2s5HSYQv9/students-learning-dDLsbhPkrBDVkY8jxHA7Ep.webp',
      title: 'Academic Excellence',
      tagline: 'Empowering Young Minds'
    },
    {
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663626262975/EcoTZJc5va3xT2s5HSYQv9/school-campus-aerial-28YRXEU7iAAu4KWHvLNEP7.webp',
      title: 'Our School',
      tagline: 'A Place of Learning & Growth'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Intro Screen */}
      {showIntro && (
        <div className="fixed inset-0 z-50 bg-blue-900 flex flex-col items-center justify-center">
          <div className="animate-fade-in-up mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-2xl">
              <span className="text-5xl font-bold text-blue-900">KV</span>
            </div>
          </div>
          <div className="text-white text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl font-bold mb-2">Mo/Thampalawela</h1>
            <p className="text-xl">K.V. School</p>
          </div>
        </div>
      )}

      {/* Navigation */}
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
            <li><a href="#home" className="hover:text-yellow-400 transition-colors">Home</a></li>
            <li><a href="#mission" className="hover:text-yellow-400 transition-colors">Mission</a></li>
            <li><a href="#principal" className="hover:text-yellow-400 transition-colors">Principal</a></li>
            <li><a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a></li>
            <li><a href="/teachers" className="hover:text-yellow-400 transition-colors">Teachers</a></li>
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
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Home</a>
            <a href="#mission" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Mission</a>
            <a href="#principal" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Principal</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Contact</a>
            <a href="/teachers" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors">Teachers</a>
            <div className="text-xs text-yellow-300 lowercase">{userEmail}</div>
            <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2"><LogOut size={18} />Logout</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 h-screen relative overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            {slides[currentSlide].title}
          </h1>
          <p className="text-2xl md:text-3xl text-yellow-400 font-bold drop-shadow-lg">
            {slides[currentSlide].tagline}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-4 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 uppercase">
            Welcome to Excellence
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Mo/Thampalawela K.V. School stands as a beacon of educational excellence in the Uva Province. 
            For decades, we have been committed to nurturing young minds, fostering academic achievement, 
            and developing well-rounded individuals who contribute positively to society.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-yellow-400 mx-auto"></div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20 px-4 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
            <h3 className="text-3xl font-bold text-blue-900 mb-4 uppercase">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              To provide quality education that empowers students with knowledge, skills, and values 
              necessary to excel academically and contribute meaningfully to their communities. We are 
              dedicated to fostering an environment where every student can discover their potential 
              and develop into responsible, compassionate citizens.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-10 rounded-lg shadow-lg">
            <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
            <h3 className="text-3xl font-bold text-yellow-400 mb-4 uppercase">Our Vision</h3>
            <p className="text-white leading-relaxed text-lg">
              To be a leading educational institution recognized for academic excellence, innovative 
              teaching methods, and the holistic development of students. We envision a school where 
              tradition meets modernity, and every student is inspired to achieve their dreams and 
              become leaders in their chosen fields.
            </p>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section id="principal" className="py-20 px-4 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
              <h4 className="text-yellow-500 font-bold uppercase text-sm mb-2 tracking-wider">
                Leadership & Vision
              </h4>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 uppercase">
                Principal's Message
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                As the Principal of Mo/Thampalawela K.V. School, I am proud to lead an institution 
                dedicated to academic excellence and character development. Our commitment is to provide 
                every student with the tools, knowledge, and inspiration they need to succeed in an 
                ever-changing world.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                We believe that education extends beyond textbooks. It encompasses developing critical 
                thinking, fostering creativity, and instilling values of integrity, compassion, and 
                responsibility. Our dedicated faculty and supportive community work together to ensure 
                that each student reaches their full potential.
              </p>
              <div className="bg-gray-100 p-6 border-l-4 border-blue-900 italic text-gray-800">
                "Excellence is not a destination; it is a journey of continuous growth and improvement."
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full border-4 border-yellow-400 rounded-lg z-0"></div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663626262975/EcoTZJc5va3xT2s5HSYQv9/students-learning-dDLsbhPkrBDVkY8jxHA7Ep.webp"
                alt="School Leadership"
                className="w-full h-96 object-cover rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* School History */}
      <section className="py-20 px-4 md:px-10 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-yellow-400 font-bold uppercase text-sm mb-4 tracking-wider">
            Our Legacy
          </h4>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Decades of Excellence
          </h2>
          <p className="text-2xl mb-4">
            Established in <span className="text-yellow-400 font-bold">1968</span>
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            For over five decades, Mo/Thampalawela K.V. School has been a cornerstone of education 
            in the Monaragala district. Our journey is marked by countless success stories, academic 
            achievements, and the positive impact our alumni continue to make in society.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-8"></div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-16 uppercase">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Academic Excellence', desc: 'Rigorous curriculum and experienced faculty' },
              { title: 'Holistic Development', desc: 'Sports, arts, and extracurricular activities' },
              { title: 'Modern Facilities', desc: 'Well-equipped classrooms and learning spaces' },
              { title: 'Dedicated Staff', desc: 'Passionate educators committed to student success' },
              { title: 'Community Values', desc: 'Strong emphasis on character and ethics' },
              { title: 'Student Support', desc: 'Comprehensive guidance and counseling services' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="w-12 h-1 bg-yellow-400 mb-4"></div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-16 uppercase">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <a 
                href="https://www.google.com/maps/place/7%C2%B000'50.9%22N+81%C2%B021'15.0%22E/@7.01415,81.3515951,17z/data=!3m1!4b1!4m4!3m3!8m2!3d7.01415!4d81.35417?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-block"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">Location</h3>
              </a>
              <p className="text-gray-700">
                Thampalawela, Dambagalla<br />
                Monaragala, Uva Province<br />
                Sri Lanka
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Phone</h3>
              <p className="text-gray-700">
                +94 (0) 55 222 8765<br />
                +94 (0) 55 222 8766
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Email</h3>
              <p className="text-gray-700">
                info@thampalawelakv.edu.lk<br />
                principal@thampalawelakv.edu.lk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">© 2024 Mo/Thampalawela K.V. School. All rights reserved.</p>
          <p className="text-yellow-400 font-bold">Excellence in Education | Building Tomorrow's Leaders</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}
