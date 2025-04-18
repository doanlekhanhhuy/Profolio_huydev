import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaFacebook, FaTwitter } from 'react-icons/fa';

const Navbar = () => {
  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Animated Gradient Background */}
      <div className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-0 animate-gradient" />

      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl mx-auto bg-white/30 backdrop-blur-md rounded-xl shadow-lg z-50 px-4 sm:px-6 px-safe">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl font-bold text-black"
          >
            Huy_Dev Portfolio
          </motion.h1>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-black hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {[
              { href: 'https://github.com/doanlekhanhhuy', icon: <FaGithub size={20} /> },
              { href: 'https://www.facebook.com/oanhuy.956255', icon: <FaFacebook size={20} /> }, // Changed to Facebook
              { href: 'https://x.com/huy_oan41814', icon: <FaTwitter size={20} /> },
            ].map(({ href, icon }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-black hover:text-blue-400 transition-colors"
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-y-auto max-h-[calc(100vh-6rem)] px-4 pb-4"
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-black hover:text-blue-400 transition-colors py-2"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </motion.a>
            ))}
            <div className="flex justify-center space-x-6 pt-3">
              {[
                { href: 'https://github.com/doanlekhanhhuy', icon: <FaGithub size={20} /> },
                { href: 'https://www.facebook.com/oanhuy.956255', icon: <FaFacebook size={20} /> }, // Changed to Facebook
                { href: 'https://x.com/huy_oan41814', icon: <FaTwitter size={20} /> },
              ].map(({ href, icon }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="text-black hover:text-blue-400 transition-colors"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar;