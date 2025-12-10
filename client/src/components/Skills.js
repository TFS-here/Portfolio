import { motion } from 'framer-motion';
import { FaCode, FaServer, FaTools } from 'react-icons/fa';

const skillsData = [
  { category: "Languages", icon: <FaCode />, items: ["C", "C++", "Python", "JavaScript", "SQL"] },
  { category: "Frameworks", icon: <FaServer />, items: ["React", "Node.js", "MongoDB", "Express.js", "Firebase"] },
  { category: "Tools", icon: <FaTools />, items: ["Git", "VS Code", "Postman", "Linux"] }
];

const Skills = () => {
  return (
    <section className="py-24 bg-cyber-black relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-white">
          <span className="border-b-2 border-neon-green pb-2">TECHNICAL ARSENAL</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05, borderColor: '#00ff9d' }}
              className="cyber-card p-8 rounded-2xl border border-gray-800 bg-gray-900/40 hover:bg-gray-900/80 transition-all duration-300"
            >
              <div className="text-4xl text-neon-blue mb-6">{skill.icon}</div>
              <h3 className="text-2xl font-bold font-display text-white mb-6">{skill.category}</h3>
              <div className="flex flex-wrap gap-3">
                {skill.items.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 text-sm font-mono text-gray-300 border border-gray-700 rounded hover:text-neon-green hover:border-neon-green transition-all">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Skills;