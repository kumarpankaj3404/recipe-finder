import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { BiDish } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-gray-300 py-8 border-t border-white/10 w-full mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className='flex items-center gap-2'>
            <div className="bg-gradient-to-tr from-orange-500 to-amber-500 p-1.5 rounded-lg">
               <BiDish className='h-5 w-5 text-white' />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
              Recipe Finder
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Pankaj. All rights reserved.
          </p>
        </div>

        {/* Social & Contact */}
        <div className="flex items-center gap-6">
           <a 
              href="https://github.com/kumarpankaj3404" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors transform hover:scale-110"
              aria-label="GitHub"
           >
              <FaGithub size={24} />
           </a>
           <a 
              href="https://linkedin.com/in/pankaj-kumar-513a10298" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors transform hover:scale-110"
               aria-label="LinkedIn"
           >
              <FaLinkedin size={24} />
           </a>
           
           <a 
              href="mailto:kumarpankaj301005@gmail.com"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:-translate-y-0.5"
           >
              <FaEnvelope />
              <span>Email Me</span>
           </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;