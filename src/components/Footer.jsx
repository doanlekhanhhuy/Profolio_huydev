import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {

    return (
        <footer className="bg-gray-100 text-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Bỏ phần Slider */}

                {/* Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-500">Contact Me</h3>
                        <p className="text-gray-700">Email: doanlekhanhhuy2152009@gmail.com</p>
                        <p className="text-gray-700">Phone: +84 707425375</p>
                        <motion.div
                            className="mt-4 inline-block text-blue-400"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Available for freelance work
                        </motion.div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-500">Quick Links</h3>
                        <div className="flex flex-col space-y-2">
                            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-gray-700 hover:text-blue-500 transition-colors duration-300
                                               hover:translate-x-2"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-start space-x-6">
                        <motion.a
                            href="https://github.com/doanlekhanhhuy"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                scale: 1.3,
                                color: '#000000',
                                y: -5,
                                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
                            }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <FaGithub size={28}  />
                        </motion.a>
                        <motion.a
                            href="https://www.facebook.com/oanhuy.956255"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                scale: 1.3,
                                color: '#000000',
                                y: -5,
                                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
                            }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <FaFacebook size={28} />
                        </motion.a>
                        <motion.a
                            href="https://x.com/huy_oan41814"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                scale: 1.3,
                                color: '#000000',
                                y: -5,
                                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
                            }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <FaTwitter size={28} />
                        </motion.a>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} Alex. All rights reserved.
                        <span className="ml-2 animate-pulse text-purple-400">Designed by HuyDoan_dev</span>
                    </p>
                </div>
            </div>
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent z-0"
                animate={{
                    rotate: [0, 360],
                    opacity: [0.1, 0.4, 0.1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />
        </footer>
    );
};

export default Footer;
