import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Gallery from './components/Gallery.jsx';
import Contact from './components/Contact.jsx';
import Register from './components/Register.jsx';
import { motion } from 'framer-motion';

function App() {
  const location = useLocation();

  // Check if the current route is the homepage ("/")
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Navbar />
      </motion.div>

      {/* Main Content */}
      <main>
        {isHomePage ? (
          // Render all sections on the homepage
          <div>
            <section id="hero">
              <Hero />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="skills">
              <Skills />
            </section>
            <section id="projects">
              <Projects />
            </section>
            {/* <section id="gallery">
              <Gallery />
            </section> */}
            <section id="contact">
              <Contact />
            </section>
            {/* <section id="register">
              <Register />
            </section> */}
          </div>
        ) : (
          // Render only the specific section for other routes
          <Outlet />
        )}
      </main>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;