import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactProps {
  onClose: () => void;
}

const Contact = ({ onClose }: ContactProps) => {
  const contacts = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: 'https://x.com/rgbasia',
      description: '关注我们的Twitter账号获取最新资讯'
    },
    {
      name: '中文社区',
      icon: '💬',
      url: 'https://qm.qq.com/q/alC4huSR0Y',
      description: '点击链接加入群聊 RGB Asia 🎡交流群'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-[#0D0208] border border-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.3)]"
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: window.innerWidth * 0.1,
        bottom: window.innerHeight * 0.1
      }}
    >
      <div className="border-b border-[#00ff41] p-2 flex justify-between items-center cursor-move">
        <span>联系方式</span>
        <button onClick={onClose} className="hover:text-[#008f11]">×</button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contacts.map((contact) => (
            <motion.a
              key={contact.name}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 border border-[#00ff41] hover:bg-[#00ff41]/10 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-4xl mb-4">{contact.icon}</span>
              <span className="text-xl mb-2">{contact.name}</span>
              <span className="text-sm text-center opacity-80">{contact.description}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;