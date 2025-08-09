'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LiquidChrome } from "../_components/animated-components/liquid-chrome";
import { Mail, Phone, Map, MessageCircle } from 'lucide-react';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    subject: 'Photography Project Inquiry',
    message: "I'm interested in your photography services. I'd love to discuss a potential project with you."
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const whatsappNumber = "25769995993"; // Format: country code + number without +
  const emailAddress = "ireinholdireinhold80@gmail.com";

  // Generate URLs based on current form data
  const whatsappMessage = encodeURIComponent(
    `Hi Reinhold, ${formData.message}`
  );
  
  const emailSubject = encodeURIComponent(formData.subject || "Photography Project Inquiry");
  const emailBody = encodeURIComponent(
    `Hi Reinhold,\n\n${formData.message}`
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const mailtoUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as any
      }
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Liquid Chrome Background */}
      <div className="fixed inset-0 z-[-1] opacity-30 h-screen w-screen">
        <LiquidChrome
          baseColor={[0.05, 0.05, 0.05]}
          speed={0.08}
          amplitude={0.12}
          interactive={true}
        />
      </div>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
          >
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 text-white">Let's Create Together</h2>
              <div className="space-y-4 md:space-y-6">
                <motion.div 
                  className="flex items-center space-x-3 md:space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-lg md:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-gray-400">Email</p>
                    <p className="text-sm md:text-lg break-words text-white">ireinholdireinhold80@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3 md:space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-lg md:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-gray-400">Phone</p>
                    <p className="text-sm md:text-lg text-white">+(257) 69 99 5993</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-3 md:space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Map className="text-lg md:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-gray-400">Location</p>
                    <p className="text-sm md:text-lg text-white">Bujumbura, Burundi</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="w-full">
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-light text-white mb-6">Customize Your Message</h3>
                
                {/* Form Fields */}
                <div className="space-y-4">


                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="w-full"
                  >
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm md:text-base"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="w-full"
                  >
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all duration-300 resize-none text-sm md:text-base"
                    />
                  </motion.div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-4 pt-4">
                  <h4 className="text-lg font-light text-white mb-4">Send Your Message</h4>
                  
                  {/* WhatsApp Button */}
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Send via WhatsApp</span>
                  </motion.a>

                  {/* Email Button */}
                  <motion.a
                    href={mailtoUrl}
                    className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Send via Email</span>
                  </motion.a>

                  {/* Info Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="text-center"
                  >
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Your message will be pre-filled. You can still edit it before sending.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;