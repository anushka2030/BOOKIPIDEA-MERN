import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            About <span className="text-yellow-400">Bookipedia</span>
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed">
            Your digital gateway to infinite stories, knowledge, and adventures. 
            Connecting readers with their next great read since day one.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-800 mb-6">Our Story</h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Born from a love of literature and technology, Bookipedia bridges the gap between 
            traditional reading and modern convenience. We believe every book has the power to 
            transform lives, and every reader deserves access to the perfect story.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-zinc-200 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-zinc-800 mb-3">Curated Collection</h3>
            <p className="text-zinc-600">
              Handpicked books across all genres, from bestsellers to hidden gems waiting to be discovered.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-zinc-200 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h3 className="text-xl font-semibold text-zinc-800 mb-3">Reader First</h3>
            <p className="text-zinc-600">
              Every decision we make puts readers at the center, ensuring the best book-buying experience.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-zinc-200 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold text-zinc-800 mb-3">Global Reach</h3>
            <p className="text-zinc-600">
              Connecting readers worldwide with stories from every corner of the globe.
            </p>
          </div>
        </div>

        {/* Stats Section
        <div className="bg-zinc-800 rounded-2xl p-12 text-white mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">50K+</div>
              <div className="text-zinc-300">Books Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">25K+</div>
              <div className="text-zinc-300">Happy Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-zinc-300">Countries Served</div>
            </div>
          </div>
        </div> */}

        {/* Features Section
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-800 mb-6">Why Choose Bookipedia?</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-zinc-200">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-zinc-800 font-bold">✓</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-zinc-800 mb-2">Lightning Fast Delivery</h3>
                <p className="text-zinc-600">Get your books delivered quickly, whether digital or physical copies.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-zinc-200">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-zinc-800 font-bold">✓</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-zinc-800 mb-2">Personalized Recommendations</h3>
                <p className="text-zinc-600">Discover your next favorite book with our AI-powered suggestion engine.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-zinc-200">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-zinc-800 font-bold">✓</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-zinc-800 mb-2">Competitive Prices</h3>
                <p className="text-zinc-600">Best prices guaranteed with regular discounts and special offers.</p>
              </div>
            </div> */}
            
            {/* <div className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-zinc-200">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-zinc-800 font-bold">✓</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-zinc-800 mb-2">24/7 Support</h3>
                <p className="text-zinc-600">Our book-loving support team is always ready to help you find what you need.</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* CTA Section */}
        <div className="text-center bg-yellow-400 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-zinc-800 mb-4">Ready to Start Reading?</h2>
          <p className="text-zinc-700 mb-8 text-lg">
            Join thousands of book lovers who've made Bookipedia their reading companion.
          </p>
          <Link to= "/all-books" className="bg-zinc-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-zinc-700 transition-colors inline-flex items-center space-x-2">
            <span>Browse Our Collection</span>
            <span className="text-lg">📖</span>
          </Link>
        </div>
      </div>
    </div>
  );
}