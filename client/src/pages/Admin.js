import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlus, FaEdit, FaTimes, FaSignOutAlt, FaCode, FaProjectDiagram, FaUserPlus, FaEnvelope, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'stats', or 'messages'
  const [data, setData] = useState([]);
  
  // Forms State
  const [projectForm, setProjectForm] = useState({ title: '', description: '', techStack: '', liveLink: '', repoLink: '' });
  const [statForm, setStatForm] = useState({ platform: '', link: '', totalSolved: '', totalContests: '', rating: '', highestRating: '', iconColor: '#00ff9d' });
  
  // Co-Admin State
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, [activeTab]);

  const fetchData = async () => {
    try {
      let endpoint = '';
      if (activeTab === 'projects') endpoint = 'https://portfolio-kkij.onrender.com/api/projects';
      else if (activeTab === 'stats') endpoint = 'https://portfolio-kkij.onrender.com/api/stats';
      else if (activeTab === 'messages') endpoint = 'https://portfolio-kkij.onrender.com/api/messages';
      
      const res = await axios.get(endpoint);
      setData(res.data);
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => { localStorage.removeItem('token'); navigate('/login'); };

  // Create Co-Admin
  const createNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://portfolio-kkij.onrender.com/api/auth/register', newAdmin, { headers: { 'x-auth-token': token } });
      alert("New Co-Admin Added Successfully!");
      setShowAdminForm(false);
      setNewAdmin({ email: '', password: '' });
    } catch (err) { alert(err.response?.data || "Failed to create admin."); }
  };

  // Form Handling
  const handleProjectChange = (e) => setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  const handleStatChange = (e) => setStatForm({ ...statForm, [e.target.name]: e.target.value });

  const startEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    if (activeTab === 'projects') setProjectForm({ ...item, techStack: item.techStack.join(', ') });
    else setStatForm(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setProjectForm({ title: '', description: '', techStack: '', liveLink: '', repoLink: '' });
    setStatForm({ platform: '', link: '', totalSolved: '', totalContests: '', rating: '', highestRating: '', iconColor: '#00ff9d' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = activeTab === 'projects' ? 'https://portfolio-kkij.onrender.com/api/projects' : 'https://portfolio-kkij.onrender.com/api/stats';
    let payload = activeTab === 'projects' ? { ...projectForm, techStack: projectForm.techStack.split(',').map(t => t.trim()) } : statForm;

    try {
      if (isEditing) await axios.put(`${endpoint}/${currentId}`, payload);
      else await axios.post(endpoint, payload);
      clearForm();
      fetchData();
      alert("Success!");
    } catch (error) { alert("Error processing request"); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this item?")) return;
    let endpoint = '';
    if (activeTab === 'projects') endpoint = `https://portfolio-kkij.onrender.com/api/projects/${id}`;
    else if (activeTab === 'stats') endpoint = `https://portfolio-kkij.onrender.com/api/stats/${id}`;
    else if (activeTab === 'messages') endpoint = `https://portfolio-kkij.onrender.com/api/messages/${id}`;
    
    await axios.delete(endpoint);
    fetchData();
  };

  // Format Date for Messages
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-cyber-black text-gray-300 p-8 pt-24 font-mono relative">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-4xl font-display text-white">ADMIN <span className="text-neon-green">PANEL</span></h1>
        <div className="flex gap-4">
          <button onClick={() => setShowAdminForm(true)} className="flex items-center gap-2 bg-neon-blue/10 text-neon-blue border border-neon-blue/50 px-4 py-2 rounded hover:bg-neon-blue hover:text-black transition-all font-bold">
            <FaUserPlus /> ADD ADMIN
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/50 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-all font-bold">
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-6xl mx-auto flex gap-4 mb-10 overflow-x-auto">
        <button onClick={() => { setActiveTab('projects'); clearForm(); }} className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${activeTab === 'projects' ? 'bg-neon-green text-black' : 'bg-gray-800 text-gray-400'}`}>
          <FaProjectDiagram /> PROJECTS
        </button>
        <button onClick={() => { setActiveTab('stats'); clearForm(); }} className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${activeTab === 'stats' ? 'bg-neon-blue text-black' : 'bg-gray-800 text-gray-400'}`}>
          <FaCode /> CP STATS
        </button>
        <button onClick={() => { setActiveTab('messages'); clearForm(); }} className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${activeTab === 'messages' ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-gray-400'}`}>
          <FaEnvelope /> MESSAGES
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* FORM SECTION (Only for Projects & Stats) */}
        {activeTab !== 'messages' ? (
          <motion.div layout className="cyber-card p-8 rounded-2xl h-fit sticky top-24">
            <h2 className="text-2xl font-display text-white mb-6 flex items-center gap-2">
              {isEditing ? <FaEdit /> : <FaPlus />} 
              {isEditing ? 'Edit' : 'Add'} {activeTab === 'projects' ? 'Project' : 'Statistic'}
              {isEditing && <button onClick={clearForm} className="ml-auto text-xs text-red-400"><FaTimes /> Cancel</button>}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'projects' ? (
                <>
                  <input name="title" value={projectForm.title} onChange={handleProjectChange} className="w-full bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-green outline-none" placeholder="Project Title" required />
                  <textarea name="description" rows="3" value={projectForm.description} onChange={handleProjectChange} className="w-full bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-green outline-none" placeholder="Description" required />
                  <input name="techStack" value={projectForm.techStack} onChange={handleProjectChange} className="w-full bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-green outline-none" placeholder="React, Node.js" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="liveLink" value={projectForm.liveLink} onChange={handleProjectChange} placeholder="Live URL" className="bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-green outline-none" />
                    <input name="repoLink" value={projectForm.repoLink} onChange={handleProjectChange} placeholder="GitHub URL" className="bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-green outline-none" />
                  </div>
                </>
              ) : (
                <>
                  <input name="platform" value={statForm.platform} onChange={handleStatChange} className="w-full bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-blue outline-none" placeholder="Platform Name" required />
                  <input name="link" value={statForm.link} onChange={handleStatChange} className="w-full bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-blue outline-none" placeholder="Profile URL" />
                  <div className="grid grid-cols-2 gap-4">
                     <input name="totalSolved" value={statForm.totalSolved} onChange={handleStatChange} className="bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-blue outline-none" placeholder="Total Solved" />
                     <input name="totalContests" value={statForm.totalContests} onChange={handleStatChange} className="bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-blue outline-none" placeholder="Total Contests" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <input name="rating" value={statForm.rating} onChange={handleStatChange} className="bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-blue outline-none" placeholder="Current Rating" />
                     <input name="highestRating" value={statForm.highestRating} onChange={handleStatChange} className="bg-cyber-gray border border-gray-700 rounded p-3 text-white focus:border-neon-blue outline-none" placeholder="Highest Rating" />
                  </div>
                  <input type="color" name="iconColor" value={statForm.iconColor} onChange={handleStatChange} className="w-full h-10 bg-transparent cursor-pointer" />
                </>
              )}
              <button type="submit" className={`w-full font-bold py-3 rounded ${activeTab === 'projects' ? 'bg-neon-green text-black' : 'bg-neon-blue text-black'}`}>
                {isEditing ? 'UPDATE' : 'SAVE'}
              </button>
            </form>
          </motion.div>
        ) : (
          /* MESSAGE INFO BOX (Only for Messages Tab) */
          <div className="cyber-card p-8 rounded-2xl h-fit border border-yellow-400/30">
             <h2 className="text-2xl font-display text-yellow-400 mb-4 flex items-center gap-2"><FaEnvelope /> Inbox</h2>
             <p className="text-gray-400">Total Messages: <span className="text-white font-bold">{data.length}</span></p>
             <p className="text-gray-500 text-sm mt-2">Messages are stored securely in your database. Deleting them here removes them permanently.</p>
          </div>
        )}

        {/* LIST SECTION */}
        <motion.div layout className="space-y-4 h-[700px] overflow-y-auto pr-2 custom-scrollbar">
          {data.length === 0 && <p className="text-gray-500 text-center mt-10">No records found.</p>}
          
          {data.map((item) => (
            <motion.div key={item._id} className="bg-gray-900/50 border border-gray-700 p-5 rounded-xl flex justify-between items-start group hover:border-white/30 transition-all">
              <div className="flex-1">
                {activeTab === 'messages' ? (
                  // MESSAGE CARD
                  <>
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-lg font-bold text-yellow-400">{item.name}</h3>
                       <span className="text-xs text-gray-500 flex items-center gap-1"><FaClock /> {formatDate(item.date)}</span>
                    </div>
                    <a href={`mailto:${item.email}`} className="text-neon-blue text-sm hover:underline block mb-2">{item.email}</a>
                    <p className="text-gray-300 bg-gray-800/50 p-3 rounded text-sm font-mono whitespace-pre-wrap">{item.message}</p>
                  </>
                ) : (
                  // PROJECT/STAT CARD
                  <>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {activeTab === 'projects' ? item.title : item.platform}
                    </h3>
                    <p className="text-gray-400 text-sm">{activeTab === 'projects' ? item.description.substring(0, 50) + '...' : `Rating: ${item.rating}`}</p>
                  </>
                )}
              </div>
              
              <div className="flex gap-2 ml-4">
                {activeTab !== 'messages' && (
                  <button onClick={() => startEdit(item)} className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded"><FaEdit /></button>
                )}
                <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded"><FaTrash /></button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CO-ADMIN MODAL (Same as before) */}
      <AnimatePresence>
        {showAdminForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="cyber-card p-8 rounded-xl w-96 border border-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.2)]">
              <h3 className="text-2xl font-display text-white mb-6 flex items-center gap-2"><FaUserPlus className="text-neon-blue" /> New Admin</h3>
              <form onSubmit={createNewAdmin} className="space-y-4">
                <input type="email" required placeholder="Email" className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white outline-none" value={newAdmin.email} onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})} />
                <input type="password" required placeholder="Password" className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white outline-none" value={newAdmin.password} onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})} />
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-neon-blue text-black font-bold py-2 rounded">CREATE</button>
                  <button type="button" onClick={() => setShowAdminForm(false)} className="flex-1 border border-red-500 text-red-500 py-2 rounded">CANCEL</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;