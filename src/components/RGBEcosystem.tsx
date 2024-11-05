import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RGBEcosystemProps {
  onClose: () => void;
}

interface Project {
  name: string;
  logo: string;
  url: string;
  description: string;
  status: 'active' | 'development' | 'planned';
  category: 'infrastructure' | 'wallet' | 'defi' | 'tools';
}

const RGBEcosystem = ({ onClose }: RGBEcosystemProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Project['category'] | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const projects: Project[] = [
    {
      name: 'Bitlight',
      logo: '/logos/bitlight.png',
      url: 'https://bitlightlabs.com/',
      description: '用户友好的RGB资产管理钱包',
      status: 'active',
      category: 'wallet'
    },
    {
      name: 'Bihelix',
      logo: '/logos/bihelix.png',
      url: 'https://www.bihelix.net/',
      description: 'RGB 协议的钱包SDK基础设施',
      status: 'active',
      category: 'infrastructure'
    },
    {
      name: 'Bitmask',
      logo: '/logos/bitmask.png',
      url: 'https://bitmask.app/',
      description: 'RGB资产管理钱包',
      status: 'active',
      category: 'wallet'
    },
    {
      name: 'Wizz wallet',
      logo: '/logos/wizz.png',
      url: 'https://wizzwallet.io/',
      description: '通过BihliexRGB SDK组建，集成了RGB钱包应用',
      status: 'active',
      category: 'wallet'
    },
    {
      name: 'Tribe RGB',
      logo: '/logos/tribe.png',
      url: 'https://bitcointribe.app/',
      description: 'RGB钱包',
      status: 'active',
      category: 'wallet'
    },
    {
      name: 'SwissKnife',
      logo: '/logos/swissknife.png',
      url: 'https://github.com/bitcoin-numeraire/swissknife',
      description: 'RGB钱包基础建设',
      status: 'active',
      category: 'wallet'
    },
    {
      name: 'KaleidoSwap',
      logo: '/logos/kaleido.png',
      url: 'https://kaleidoswap.com/',
      description: 'RGB基础SWAP',
      status: 'planned',
      category: 'defi'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'infrastructure', name: '基础设施' },
    { id: 'wallet', name: '钱包' },
    { id: 'defi', name: 'DeFi' },
    { id: 'tools', name: '工具' }
  ];

  const statusColors = {
    active: 'text-green-400',
    development: 'text-yellow-400',
    planned: 'text-blue-400'
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-4 bg-[#0D0208] border border-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.3)] flex flex-col"
      drag
      dragConstraints={{
        top: 4,
        left: 4,
        right: 4,
        bottom: 4
      }}
    >
      <div className="border-b border-[#00ff41] p-2 flex justify-between items-center cursor-move">
        <span>RGB生态系统</span>
        <button onClick={onClose} className="hover:text-[#008f11]">×</button>
      </div>

      <div className="flex-1 overflow-hidden p-4 flex flex-col">
        <div className="flex justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setFilter(category.id as any);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 border border-[#00ff41] ${
                filter === category.id ? 'bg-[#00ff41] text-[#0D0208]' : 'hover:bg-[#00ff41]/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1 overflow-y-auto p-4"
        >
          <AnimatePresence mode="popLayout">
            {currentProjects.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedProject(project)}
                className="flex flex-col items-center p-6 border border-[#00ff41] hover:bg-[#00ff41]/10 cursor-pointer relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/0 via-[#00ff41]/10 to-[#00ff41]/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="w-24 h-24 mb-4 relative group-hover:scale-110 transition-transform">
                  <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/logos/default.png';
                    }}
                  />
                </div>
                <span className="text-lg text-center mb-2">{project.name}</span>
                <span className={`text-sm ${statusColors[project.status]}`}>
                  {project.status === 'active' ? '运行中' : 
                   project.status === 'development' ? '开发中' : '计划中'}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-4 p-2 border-t border-[#00ff41]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-[#00ff41] ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00ff41]/10'
              }`}
            >
              上一页
            </button>
            <span className="text-[#00ff41]">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-[#00ff41] ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00ff41]/10'
              }`}
            >
              下一页
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0D0208] border border-[#00ff41] p-6 max-w-md m-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedProject.logo}
                    alt={`${selectedProject.name} logo`}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/logos/default.png';
                    }}
                  />
                  <span className="text-xl">{selectedProject.name}</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="hover:text-[#008f11]"
                >
                  ×
                </button>
              </div>
              <p className="mb-4 text-sm opacity-80">{selectedProject.description}</p>
              <div className="mb-4">
                <span className={`text-sm ${statusColors[selectedProject.status]}`}>
                  状态: {selectedProject.status === 'active' ? '运行中' : 
                        selectedProject.status === 'development' ? '开发中' : '计划中'}
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-[#0D0208]"
                >
                  访问
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-[#0D0208]"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RGBEcosystem;