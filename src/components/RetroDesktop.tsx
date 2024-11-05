import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PowerAnimation from './PowerAnimation';
import Terminal from './Terminal';
import RGBFiles from './RGBFiles';
import RGBEcosystem from './RGBEcosystem';
import Events from './Events';
import Contact from './Contact';
import ASCIIBackground from './ASCIIBackground';

const RetroDesktop = () => {
  const [powerState, setPowerState] = useState<'on' | 'shutdown' | 'off' | 'startup'>('on');
  const [showProcessWindow, setShowProcessWindow] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [showEcosystem, setShowEcosystem] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showComputerError, setShowComputerError] = useState(false);
  
  const icons = [
    { id: 'computer', icon: '💻', label: '我的电脑', top: 20, left: 20 },
    { id: 'documents', icon: '📁', label: 'RGB文件', top: 120, left: 20 },
    { id: 'internet', icon: '🌐', label: 'RGB生态', top: 220, left: 20 },
    { id: 'terminal', icon: '⌨️', label: 'RGB终端机', top: 320, left: 20 },
    { id: 'events', icon: '🎪', label: '线下活动', top: 420, left: 20 },
    { id: 'contact', icon: '📱', label: '联系方式', top: 520, left: 20 },
  ];

  const handleIconClick = (id: string) => {
    switch (id) {
      case 'computer':
        setShowComputerError(true);
        break;
      case 'documents':
        setShowFiles(true);
        break;
      case 'internet':
        setShowEcosystem(true);
        break;
      case 'terminal':
        setShowTerminal(true);
        break;
      case 'events':
        setShowEvents(true);
        break;
      case 'contact':
        setShowContact(true);
        break;
    }
  };

  const handleShutdown = () => setPowerState('shutdown');
  const handleShutdownComplete = () => setPowerState('off');
  const handleStartup = () => setPowerState('startup');
  const handleStartupComplete = () => setPowerState('on');

  if (powerState === 'off') {
    return (
      <div className="relative w-full h-screen bg-[#000212] overflow-hidden">
        <button 
          onClick={handleStartup}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-3 bg-[#000212] border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-[#000212]"
        >
          开机
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#0D0208] overflow-hidden">
      <ASCIIBackground />
      
      <AnimatePresence mode="wait">
        {(powerState === 'shutdown' || powerState === 'startup') && (
          <PowerAnimation 
            type={powerState} 
            onComplete={powerState === 'shutdown' ? handleShutdownComplete : handleStartupComplete} 
          />
        )}
      </AnimatePresence>

      {powerState === 'on' && (
        <>
          {/* Desktop Icons */}
          {icons.map((icon) => (
            <motion.div
              key={icon.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
              className="absolute flex flex-col items-center p-2 cursor-pointer hover:bg-[#00ff41]/10"
              style={{ top: icon.top, left: icon.left }}
              onClick={() => handleIconClick(icon.id)}
            >
              <span className="text-3xl mb-1">{icon.icon}</span>
              <span className="text-xs text-[#00ff41] whitespace-nowrap">{icon.label}</span>
            </motion.div>
          ))}

          {/* Process Window */}
          <AnimatePresence>
            {showProcessWindow && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4 w-80 bg-[#0D0208] border border-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.3)]"
              >
                <div className="border-b border-[#00ff41] p-2 flex justify-between items-center">
                  <span>RGB协议进程</span>
                  <button 
                    onClick={() => setShowProcessWindow(false)}
                    className="hover:text-[#008f11]"
                  >
                    ×
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">RGB BTC主网进程</span>
                    <span className="text-sm">90%</span>
                  </div>
                  <div className="relative w-full h-4 border border-[#00ff41] mb-4 overflow-hidden bg-[#0D0208]">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "90%" }}
                      transition={{ duration: 2 }}
                      className="absolute h-full bg-[#00ff41]"
                    />
                    <div className="absolute inset-0 grid grid-cols-10 gap-[1px]">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="border-r border-[#00ff41]/30 h-full" />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button className="px-4 py-1 border border-[#00ff41] hover:bg-[#00ff41] hover:text-[#0D0208]">
                      再来两周
                    </button>
                    <button className="px-4 py-1 border border-[#00ff41] hover:bg-[#00ff41] hover:text-[#0D0208]">
                      RGB没救了
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Computer Error Window */}
          <AnimatePresence>
            {showComputerError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0D0208] border border-[#00ff41] p-4 shadow-[0_0_10px_rgba(0,255,65,0.3)]"
              >
                <div className="flex justify-between items-center mb-4">
                  <span>系统提示</span>
                  <button 
                    onClick={() => setShowComputerError(false)}
                    className="hover:text-[#008f11]"
                  >
                    ×
                  </button>
                </div>
                <p className="mb-4">想看我私钥？想的美</p>
                <div className="flex justify-end">
                  <button 
                    onClick={() => setShowComputerError(false)}
                    className="px-4 py-1 border border-[#00ff41] hover:bg-[#00ff41] hover:text-[#0D0208]"
                  >
                    确定
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Terminal Window */}
          <AnimatePresence>
            {showTerminal && (
              <Terminal onClose={() => setShowTerminal(false)} />
            )}
          </AnimatePresence>

          {/* RGB Files Window */}
          <AnimatePresence>
            {showFiles && (
              <RGBFiles onClose={() => setShowFiles(false)} />
            )}
          </AnimatePresence>

          {/* RGB Ecosystem Window */}
          <AnimatePresence>
            {showEcosystem && (
              <RGBEcosystem onClose={() => setShowEcosystem(false)} />
            )}
          </AnimatePresence>

          {/* Events Window */}
          <AnimatePresence>
            {showEvents && (
              <Events onClose={() => setShowEvents(false)} />
            )}
          </AnimatePresence>

          {/* Contact Window */}
          <AnimatePresence>
            {showContact && (
              <Contact onClose={() => setShowContact(false)} />
            )}
          </AnimatePresence>

          {/* Start Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-10 bg-[#0D0208] border-t border-[#00ff41]"
          >
            <button 
              onClick={handleShutdown}
              className="h-full px-4 flex items-center gap-2 hover:bg-[#00ff41]/10"
            >
              <span>▶</span>
              <span>关机</span>
            </button>
          </motion.div>

          {/* Loading Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-20 right-10 bg-[#0D0208] border border-[#00ff41] p-4"
          >
            <div className="mb-2 text-sm flex flex-col">
              <span>本网页由RGB中文社区无偿贡献</span>
              <span className="opacity-70">this website created by RGB Asia</span>
            </div>
            <div className="w-48 h-4 border border-[#00ff41] overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-full bg-[#00ff41]"
              />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default RetroDesktop;