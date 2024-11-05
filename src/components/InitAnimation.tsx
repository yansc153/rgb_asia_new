import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const InitAnimation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = [
    '加载系统...',
    '[状态进程] 加载系统模块...',
    '[状态进程] 构建跨域神经连接...',
    '[状态进程] 检查系统道德标准...',
    '[状态进程] 加载人工智能大脑...',
    '[状态进程] RGB 2077系统启动完毕.'
  ];

  useEffect(() => {
    if (currentLine < lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono text-[#00ff41] space-y-2"
      >
        {lines.slice(0, currentLine + 1).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base"
          >
            {line}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InitAnimation;