
import React, { useEffect, useState, useCallback } from 'react';
import { FlavorGrid } from './components/FlavorGrid';
import { Feedback } from './components/Feedback';
import { Chatbot } from './components/Chatbot';
// import { FlavorMatch } from './components/FlavorMatch';
import { CONTACT_INFO } from './constants';
const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Flavors', href: '#flavors' },
    // { name: 'AI Match', href: '#match' },
    { name: 'Feedback', href: '#feedback' },
    { name: 'Find Us', href: '#contact' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white shadow-xl py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition duration-300 shadow-lg">K</div>
            <span className={`text-2xl font-serif font-extrabold tracking-tight transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              Kaaraalan Goli Soda
            </span>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex gap-10 font-bold text-sm uppercase tracking-widest ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>
            {navLinks.map(link => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.href)}
                className="hover:text-teal-500 transition relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-teal-500 after:transition-all hover:after:w-full"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <button 
              onClick={() => scrollToSection('contact')}
              className="hidden md:block bg-teal-600 text-white px-8 py-2.5 rounded-full font-bold hover:bg-teal-700 transition shadow-lg transform active:scale-95"
            >
              Contact Us
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden text-2xl transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl p-6 flex flex-col gap-6 animate-fadeIn">
            {navLinks.map(link => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.href)}
                className="text-left text-slate-800 font-bold text-lg hover:text-teal-500 border-b border-slate-100 pb-2"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold"
            >
              Contact Us
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 scale-110">
          <img 
            src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-50" 
            alt="Soda Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        {/* Floating Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({length: 25}).map((_, i) => (
            <div 
              key={i} 
              className="bubble" 
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 15 + 5}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* <div className="inline-block bg-teal-500/20 backdrop-blur-md text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-8 animate-bounceIn">
            Authentic Kongu Goli Soda
          </div> */}
          <h1 className="text-6xl md:text-9xl font-serif font-black text-white mb-8 leading-tight">
            The Fizz of <span className="text-teal-400 italic">Kaaraalan.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            From the banks of the Amaravathi to the streets of <span className="text-white font-bold underline decoration-teal-500">Karur, Erode & Covai.</span> Experience the legendary pop and authentic taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => scrollToSection('flavors')}
              className="bg-teal-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-teal-700 transition shadow-2xl transform hover:scale-110 active:scale-95 flex items-center justify-center gap-2"
            >
              Explore 8 Flavors <i className="fas fa-chevron-right text-sm"></i>
            </button>
            {/* <button 
              onClick={() => scrollToSection('match')}
              className="bg-white/10 backdrop-blur-lg border-2 border-white/20 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition shadow-2xl transform hover:scale-110 active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fas fa-magic"></i> AI Mood Match
            </button> */}
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/40">
          <i className="fas fa-mouse text-2xl"></i>
        </div>
      </section>

      {/* Main Sections */}
      <FlavorGrid />
      {/* <FlavorMatch /> */}
      <Feedback />

      {/* Location & Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">Our Presence</div>
              <h2 className="text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">Serving the authentic flavours throughout Tamilnadu.</h2>
              <p className="text-slate-600 mb-10 text-xl leading-relaxed">Watch our specialized machines seal the goli bottles in Karur and get your drinks fresh. We represent the pride of the Kongu region's beverage heritage.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="group cursor-pointer p-6 rounded-2xl bg-slate-50 hover:bg-teal-50 transition border border-transparent hover:border-teal-200 shadow-sm" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`)}>
                  <div className="bg-teal-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition"><i className="fas fa-map-marker-alt text-xl"></i></div>
                  <h4 className="font-bold text-slate-900 mb-1">Address</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                </div>
                <div className="group cursor-pointer p-6 rounded-2xl bg-slate-50 hover:bg-teal-50 transition border border-transparent hover:border-teal-200 shadow-sm" onClick={() => window.location.href = `tel:${CONTACT_INFO.phone}`}>
                  <div className="bg-teal-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition"><i className="fas fa-phone text-xl"></i></div>
                  <h4 className="font-bold text-slate-900 mb-1">Call Support</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{CONTACT_INFO.phone}</p>
                </div>
                <div className="group cursor-pointer p-6 rounded-2xl bg-slate-50 hover:bg-teal-50 transition border border-transparent hover:border-teal-200 shadow-sm" onClick={() => window.location.href = `mailto:${CONTACT_INFO.email}`}>
                  <div className="bg-teal-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition"><i className="fas fa-envelope text-xl"></i></div>
                  <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{CONTACT_INFO.email}</p>
                </div>
                <div className="group p-6 rounded-2xl bg-slate-50 transition border border-transparent shadow-sm">
                  <div className="bg-teal-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition"><i className="fas fa-truck text-xl"></i></div>
                  <h4 className="font-bold text-slate-900 mb-1">Distributions</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Daily routes to Erode & Coimbatore available.</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100">
                <p className="font-bold text-slate-800 mb-4 uppercase tracking-widest text-xs">Join Our Kongu Community</p>
                <div className="flex gap-4">
                  <a href={CONTACT_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white transition shadow-sm hover:shadow-lg transform hover:-translate-y-1"><i className="fab fa-instagram text-2xl"></i></a>
                  <a href={CONTACT_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white transition shadow-sm hover:shadow-lg transform hover:-translate-y-1"><i className="fab fa-facebook-f text-2xl"></i></a>
                  {/* <a href={CONTACT_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white transition shadow-sm hover:shadow-lg transform hover:-translate-y-1"><i className="fab fa-twitter text-2xl"></i></a> */}
                </div>
              </div>
            </div>

            <div className="h-[600px] rounded-[40px] overflow-hidden shadow-3xl border-[12px] border-slate-100 relative group">
              <iframe 
                src={CONTACT_INFO.mapUrl}
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps Location"
                className="grayscale-[0.2] contrast-[1.1]"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-[30px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">K</div>
                <span className="text-2xl font-serif font-extrabold">Kaaraalan Goli Soda</span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Premium Goli Soda manufactured in Karur using the finest natural ingredients. Serving the heart of Tamil Nadu.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-teal-400 uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <button 
                      onClick={() => scrollToSection(link.href)} 
                      className="hover:text-white transition text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-teal-400 uppercase tracking-widest text-sm">Top Flavors</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => scrollToSection('flavor-panner')} className="hover:text-white transition text-left">Signature Panner</button></li>
                <li><button onClick={() => scrollToSection('flavor-nannari')} className="hover:text-white transition text-left">Authentic Nannari</button></li>
                <li><button onClick={() => scrollToSection('flavor-blueberry')} className="hover:text-white transition text-left">Modern Blueberry</button></li>
                <li><button onClick={() => scrollToSection('flavor-ginger')} className="hover:text-white transition text-left">Zesty Ginger</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-teal-400 uppercase tracking-widest text-sm">Newsletter</h4>
              <p className="text-slate-400 mb-4 text-sm">Get the latest bubble alerts from Kaaraalan!</p>
              <form 
                onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }} 
                className="flex bg-slate-900 rounded-xl overflow-hidden p-1"
              >
                <input type="email" required placeholder="Email" className="bg-transparent border-none px-4 py-2 flex-1 focus:outline-none text-sm" />
                <button type="submit" className="bg-teal-600 px-4 py-2 rounded-lg font-bold hover:bg-teal-700 transition"><i className="fas fa-paper-plane"></i></button>
              </form>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Kaaraalan Goli Soda. Proudly Made in Karur. <i className="fas fa-heart text-rose-500 mx-1"></i></p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      {/* <Chatbot /> */}
    </div>
  );
};

export default App;
