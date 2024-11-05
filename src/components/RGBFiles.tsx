import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RGBFilesProps {
  onClose: () => void;
}

interface File {
  type: 'video' | 'doc' | 'pdf';
  title: string;
  url: string;
  description: string;
  icon: string;
  category: 'tutorial' | 'documentation' | 'whitepaper';
}

const RGBFiles = ({ onClose }: RGBFilesProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<File['category'] | 'all'>('all');

  const files: File[] = [
    {
      type: 'video',
      title: 'LNP/BP的英文视频',
      description: '深入了解RGB协议的工作原理和优势',
      url: 'https://www.youtube.com/@LNPBP',
      icon: '🎥',
      category: 'tutorial'
    },
    {
      type: 'pdf',
      title: 'RGB资料',
      description: 'RGB协议技技术资料',
      url: 'https://blackpaper.rgb.tech/',
      icon: '📄',
      category: 'whitepaper'
    },
    {
      type: 'doc',
      title: 'RGB文档',
      description: '面向开发者的技术文档',
      url: 'https://rgb.tech/',
      icon: '📚',
      category: 'documentation'
    },
    {
      type: 'video',
      title: 'RGB科普教程-花椒',
      description: 'RGB-从入门到入门',
      url: 'https://youtube.com/playlist?list=PL9_Eoig1ztix_j6N6hqswuvDv3FDiSoJO&si=OfL74dyHwZfw7vbQ',
      icon: '📹',
      category: 'tutorial'
    }
  ];

  const categories = [
    { id: 'all', name: '全部文件' },
    { id: 'tutorial', name: '教程' },
    { id: 'documentation', name: '文档' },
    { id: 'whitepaper', name: '白皮书' }
  ];

  const filteredFiles = filter === 'all' 
    ? files 
    : files.filter(file => file.category === filter);

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
        <div className="flex items-center gap-4">
          <span>RGB文件</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView('grid')}
              className={`px-2 py-1 ${currentView === 'grid' ? 'bg-[#00ff41] text-[#0D0208]' : 'border border-[#00ff41]'}`}
            >
              网格视图
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`px-2 py-1 ${currentView === 'list' ? 'bg-[#00ff41] text-[#0D0208]' : 'border border-[#00ff41]'}`}
            >
              列表视图
            </button>
          </div>
        </div>
        <button onClick={onClose} className="hover:text-[#008f11]">×</button>
      </div>

      <div className="flex-1 overflow-hidden p-4 flex flex-col">
        <div className="flex justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id as any)}
              className={`px-4 py-2 border border-[#00ff41] ${
                filter === category.id ? 'bg-[#00ff41] text-[#0D0208]' : 'hover:bg-[#00ff41]/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {currentView === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1 overflow-y-auto p-4"
            >
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFile(file)}
                  className="flex flex-col items-center p-4 border border-[#00ff41] hover:bg-[#00ff41]/10 cursor-pointer"
                >
                  <span className="text-4xl mb-2">{file.icon}</span>
                  <span className="text-sm text-center mb-1">{file.title}</span>
                  <span className="text-xs text-center opacity-60">{file.type.toUpperCase()}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto space-y-2 p-4"
            >
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  onClick={() => setSelectedFile(file)}
                  className="flex items-center p-4 border border-[#00ff41] hover:bg-[#00ff41]/10 cursor-pointer"
                >
                  <span className="text-2xl mr-4">{file.icon}</span>
                  <div>
                    <div className="text-sm">{file.title}</div>
                    <div className="text-xs opacity-60">{file.description}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#0D0208] border border-[#00ff41] p-6 max-w-md m-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedFile.icon}</span>
                  <span className="text-xl">{selectedFile.title}</span>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="hover:text-[#008f11]"
                >
                  ×
                </button>
              </div>
              <p className="mb-4 text-sm opacity-80">{selectedFile.description}</p>
              <div className="flex justify-end gap-2">
                <a
                  href={selectedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[#00ff41] hover:bg-[#00ff41] hover:text-[#0D0208]"
                >
                  打开
                </a>
                <button
                  onClick={() => setSelectedFile(null)}
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

export default RGBFiles;