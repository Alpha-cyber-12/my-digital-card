import React from 'react';
import { motion } from 'framer-motion';

// A simple component for the card's main section
const CompanyCard = ({ companyName, personName, title, bio, logoUrl }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  return (
    <motion.div
      className="relative z-10 p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center bg-gray-900 border border-gray-700"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="mx-auto w-24 h-24 md:w-28 md:h-28 mb-4 rounded-full overflow-hidden border-4 border-gray-700 shadow-xl bg-gray-800 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <img src={logoUrl} alt={`${companyName} Logo`} className="object-cover w-full h-full" />
      </motion.div>
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-100 tracking-wide mb-1"
        variants={textVariants}
      >
        {companyName}
      </motion.h2>

      <motion.hr className="w-16 mx-auto my-4 border-gray-600" variants={textVariants} />

      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-wide mb-1 uppercase"
        variants={textVariants}
      >
        {personName}
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl font-medium text-blue-400 uppercase tracking-widest mb-6 italic"
        variants={textVariants}
      >
        {title}
      </motion.p>
      <motion.p
        className="text-gray-300 mb-8 max-w-sm mx-auto"
        variants={textVariants}
      >
        {bio}
      </motion.p>
    </motion.div>
  );
};

const ContactInfo = ({ icon, text, link }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div className="flex items-center space-x-4" variants={itemVariants}>
      <motion.div
        className="w-6 h-6 text-blue-400 flex-shrink-0"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
      >
        {icon}
      </motion.div>
      {link ? (
        <a href={link} className="text-gray-300 hover:text-blue-400 transition duration-200 font-medium">
          {text}
        </a>
      ) : (
        <span className="text-gray-300 font-medium">{text}</span>
      )}
    </motion.div>
  );
};

const App = () => {
  const companyData = {
    companyName: 'S.K ENTERPRISES',
    personName: 'VIKAS AGARWAL',
    title: 'Proprietor',
    bio: "Dedicated business owner committed to excellence and strategic growth. Let's connect and build something great.",
    logoUrl: "https://placehold.co/112x112/0c0c1b/e0e0e0?text=SKE"
  };

  const contactData = [
    {
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 4.99-8-4.99V6h16zm-16 12V9.489l7.447 4.654a.996.996 0 001.106 0L20 9.489V18H4z"></path></svg>,
      text: 'Vikasagarwal183@gmail.com',
      link: 'mailto:Vikasagarwal183@gmail.com'
    },
    {
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.088 15.088 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.21c1.2.48 2.5.74 3.86.74a1 1 0 011 1v3.5a1 1 0 01-1 1C7.92 21.41 2.59 16.08 2.59 9a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.26 2.66.73 3.79a1 1 0 01-.2 1.11l-2.2 2.2z"></path></svg>,
      text: '+91 9811107598',
      link: 'https://wa.me/919811107598'
    },
    {
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 3.75 5 11 7 13 2-2 7-9.25 7-13 0-3.87-3.13-7-7-7zM12 11.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"></path></svg>,
      text: 'B-2/50, D.S.I.D.C. Industrial Compound, Jhilmil Industrial Area, Delhi - 110095',
      link: null
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 bg-gray-950">
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 opacity-50"></div>

      {/* Main card component */}
      <CompanyCard {...companyData} />

      {/* Contact information list */}
      <motion.div
        className="relative z-10 md:ml-8 mt-8 md:mt-0 space-y-4 text-center md:text-left"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {contactData.map((item, index) => (
          <ContactInfo key={index} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

export default App;