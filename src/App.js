import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">très chic</h1>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <ul className={`md:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Collection</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/fashion.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
        <div className="relative z-10 text-center" data-aos="fade-up">
          <h1 className="text-7xl font-bold mb-4 text-white">
            très chic
          </h1>
          <p className="text-2xl italic text-gray-300">
            Embrace the darkness, embody the style
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300">
            Explore Fall 2024 Collection
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Featured Collection */}
        <section className="mb-24">
          <h2 className="text-4xl font-semibold mb-12 text-center" data-aos="fade-up">Fall 2024 Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Midnight Velvet Gown", price: "£1,299" },
              { name: "Obsidian Leather Jacket", price: "£899" },
              { name: "Onyx Silk Blouse", price: "£459" }
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src={`/images/fashion-${index + 1}.webp`}
                  alt={item.name}
                  className="w-full h-120 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-lg mb-4">{item.price}</p>
                  <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="mb-24 relative py-24">
          <div className="absolute inset-0 bg-gray-900 transform -skew-y-6"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
              <h2 className="text-4xl font-semibold mb-6 text-white">The très chic Story</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Born from the shadows of Paris's haute couture scene, très chic emerged as a rebellious voice in fashion. Our founder, Élise Noir, envisioned a brand that would challenge the norms of traditional design.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Since 2010, we've been crafting bold, edgy pieces that empower individuals to express their inner darkness with unparalleled style. Our designs are not just clothes; they're a statement, an attitude, a way of life.
              </p>
              <button className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300">
                Discover Our Legacy
              </button>
            </div>
            <div className="md:w-1/2 md:pl-12" data-aos="fade-left">
              <img src="/images/atelier.jpeg" alt="très chic Atelier" className="w-full h-auto rounded-lg shadow-2xl" />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gradient-to-r from-gray-900 to-black p-12 rounded-lg relative overflow-hidden" data-aos="fade-up">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <img src="/images/dark-fabric.jpeg" alt="Dark Fabric Texture" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-semibold mb-6 text-white">Join the Dark Collective</h2>
            <p className="text-gray-300 mb-8 text-lg">Subscribe to our newsletter for exclusive offers, early access to new collections, and dark fashion inspiration delivered straight to your inbox.</p>
            <form className="flex flex-col sm:flex-row max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white bg-opacity-20 text-white px-6 py-4 rounded-l-full sm:rounded-r-none mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
              />
              <button
                type="submit"
                className="bg-white text-black px-8 py-4 rounded-r-full sm:rounded-l-none hover:bg-gray-200 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 très chic. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;