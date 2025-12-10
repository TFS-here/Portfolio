import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ["MERN Stack Developer", "Competitive Programmer", "Tech Enthusiast"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000); 
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden bg-cyber-black">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h2 className="text-neon-green font-mono text-lg md:text-xl mb-4 tracking-widest">
          HI, MY NAME IS
        </h2>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
          Md. Tasnim Ferdous
        </h1>

        <div className="h-10 mb-8">
          <span className="text-2xl md:text-3xl text-neon-blue font-mono border-r-4 border-neon-green pr-2">
            {text}
          </span>
        </div>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10 leading-relaxed font-mono">
          Building scalable web applications and solving complex algorithmic problems.
          <br /> Based in <span className="text-white">Patuakhali, Bangladesh</span>.
        </p>

        <div className="flex gap-6 justify-center">
          <a href="https://github.com/shifattfs00" target="_blank" rel="noreferrer" className="text-3xl text-gray-400 hover:text-neon-green transition-colors"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-3xl text-gray-400 hover:text-neon-blue transition-colors"><FaLinkedin /></a>
          <a href="mailto:shifattfs00@gmail.com" className="text-3xl text-gray-400 hover:text-neon-green transition-colors"><FaEnvelope /></a>
        </div>
      </motion.div>
    </section>
  );
};
export default Hero;