import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-950 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                {/* <span className="text-white font-bold text-lg">📚</span> 
              </div> */}
              <h3 className="text-2xl font-bold text-slate-800">BOOKIPIDEA</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your gateway to endless stories and knowledge. Discover, explore, and immerse yourself in the world of books.
            </p>
            {/* <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors text-white">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors text-white">
                t
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors text-white">
                ig
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors text-white">
                yt
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-500 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['New Releases', 'Bestsellers', 'Fiction', 'Non-Fiction', 'Children\'s Books', 'Academic'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              {['Help Center', 'Returns & Exchanges', 'Shipping Info', 'Track Your Order', 'Gift Cards', 'Book Clubs'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-400 font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 text-amber-400">📞</span>
                <span className="text-gray-400">+91 123456</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 text-amber-400">✉️</span>
                <span className="text-gray-400">chakravartianushka23@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 text-amber-400 mt-1">📍</span>
                <span className="text-gray-400">123 Literature Lane<br />Book City</span>
              </div>
            </div>
            
            
            {/* <div className="mt-6">
              <h5 className="text-white font-medium mb-3">Stay Updated</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-r-lg hover:from-amber-600 hover:to-orange-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-800 text-lg">
              &copy; 2024 BOOKIPIDEA. All rights reserved. Made by Anushka
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;