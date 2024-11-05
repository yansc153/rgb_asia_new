import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PowerAnimationProps {
  type: 'shutdown' | 'startup';
  onComplete: () => void;
}

const PowerAnimation = ({ type, onComplete }: PowerAnimationProps) => {
  const messages = type === 'shutdown' 
    ? [
        '关闭RGB 2077操作系统...',
        '正在保存你的设定...',
        '停止所有的操作...',
        '现在已经正式关机.'
      ]
    : [
        '启动 RGB 2077操作系统...',
        '加载系统文件...',
        '初始化硬盘...',
        '加载个人信息...'
      ];

  useEffect(() => {
    if (type === 'startup') {
      const timer = setTimeout(() => {
        onComplete();
      }, messages.length * 800 + 1000);
      return () => clearTimeout(timer);
    }
  }, [type, messages.length, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#000212] flex flex-col items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-[#00ff41] text-2xl mb-4">RGB 2077</div>
          {messages.map((msg, index) => (
            <motion.div
              key={msg}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.8 }}
              className="text-[#00ff41] text-sm mb-2"
            >
              {msg}
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: type === 'shutdown' ? 3 : messages.length }}
          onAnimationComplete={() => {
            if (type === 'shutdown') {
              onComplete();
            }
          }}
          className="w-64 h-2 bg-[#00ff41]"
        />
      </div>
    </motion.div>
  );
};

export default PowerAnimation;