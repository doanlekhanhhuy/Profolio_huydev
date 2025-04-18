import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const MessagingForm = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Particle and Orb Effects
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'absolute inset-0 pointer-events-none z-0';
    containerRef.current.appendChild(canvas);

    canvas.width = containerRef.current.offsetWidth;
    canvas.height = containerRef.current.offsetHeight;

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.4 - 0.2,
    }));

    const orbs = Array.from({ length: 4 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 25 + 15,
      vx: Math.random() * 0.3 - 0.15,
      vy: Math.random() * 0.3 - 0.15,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      orbs.forEach(o => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < 0 || o.x > canvas.width) o.vx *= -1;
        if (o.y < 0 || o.y > canvas.height) o.vy *= -1;
        const gradient = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => canvas.remove();
  }, []);

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleMessageChange = e => {
    setMessage(e.target.value);
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleRegister = async e => {
    e.preventDefault();
    const validationErrors = validateRegisterForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Registration successful!' });
        setIsRegistered(true);
        setShowRegisterForm(false);
        setFormData({ username: '', email: '', password: '' });
      } else {
        throw new Error(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setFormStatus({ type: 'error', message: error.message || 'Failed to register. Please try again.' });
    }
  };

  const handleSendMessage = async e => {
    e.preventDefault();
    if (!message.trim()) {
      setFormStatus({ type: 'error', message: 'Message cannot be empty' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, message }),
      });

      const result = await response.json();
      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Message sent successfully!' });
        setMessage('');
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Send message error:', error);
      setFormStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again.' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.15 } },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
      borderColor: 'rgba(99, 102, 241, 0.6)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="messaging"
      ref={containerRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
        animate={{
          background: [
            'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)',
            'linear-gradient(135deg, #d6e4ff 0%, #e9d5ff 50%, #fad0d8 100%)',
            'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute inset-0" style={{ filter: 'blur(100px)', mixBlendMode: 'overlay' }}>
        <motion.div
          className="absolute w-[50%] h-[50%] bg-indigo-400 opacity-30 rounded-full"
          animate={{ x: ['0%', '20%', '-20%', '0%'], y: ['0%', '30%', '10%', '0%'], scale: [1, 1.2, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[40%] h-[40%] bg-purple-400 opacity-30 rounded-full right-0 bottom-0"
          animate={{ x: ['0%', '-30%', '10%', '0%'], y: ['0%', '-20%', '15%', '0%'], scale: [1, 1.15, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-md mx-auto relative z-10"
      >
        {showRegisterForm ? (
          <>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 tracking-tight"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Register
            </motion.h2>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <motion.input
                  type="text"
                  name="username"
                  placeholder="Your Username"
                  className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-transparent focus:outline-none text-gray-700"
                  whileFocus="focus"
                  variants={inputVariants}
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>
              <div>
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-transparent focus:outline-none text-gray-700"
                  whileFocus="focus"
                  variants={inputVariants}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <motion.input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-transparent focus:outline-none text-gray-700"
                  whileFocus="focus"
                  variants={inputVariants}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg"
              >
                Register
              </motion.button>
            </form>
          </>
        ) : (
          <>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 tracking-tight"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Send a Message
            </motion.h2>
            <form className="space-y-4" onSubmit={handleSendMessage}>
              <div>
                <motion.textarea
                  name="message"
                  placeholder="Your Message"
                  className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-transparent focus:outline-none text-gray-700"
                  whileFocus="focus"
                  variants={inputVariants}
                  value={message}
                  onChange={handleMessageChange}
                  rows="4"
                />
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!isRegistered}
                  className={`w-full px-6 py-3 rounded-full font-semibold shadow-lg ${
                    isRegistered
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  Send Message
                </motion.button>
                {!isRegistered && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowRegisterForm(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full font-semibold shadow-lg"
                  >
                    Register
                  </motion.button>
                )}
              </div>
            </form>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {formStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setFormStatus(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateX: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white/90 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <h3
                  className={`text-xl font-semibold ${
                    formStatus.type === 'success' ? 'text-indigo-600' : 'text-red-600'
                  }`}
                >
                  {formStatus.type === 'success' ? 'Success!' : 'Error'}
                </h3>
                <p className="text-gray-600 mt-2">{formStatus.message}</p>
                <motion.button
                  onClick={() => setFormStatus(null)}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MessagingForm;