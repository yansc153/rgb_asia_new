import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  onClose: () => void;
}

type CommandType = {
  [key: string]: string | ((args: string) => string);
};

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>(['Welcome to RGB Terminal v1.0.0', 'Type "help" for available commands']);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: CommandType = {
    help: `Available commands:
  help     - Show this help message
  clear    - Clear terminal
  echo     - Echo back your input
  rgb      - Show RGB protocol info
  btc      - Show Bitcoin info
  ls       - List files
  date     - Show current date
  exit     - Close terminal`,
    clear: 'clear',
    echo: (args: string) => args,
    rgb: `RGB Protocol v0.10
  - Smart contracts on Bitcoin
  - Client-side validation
  - Scalable architecture
  - Privacy by default`,
    btc: 'Bitcoin - Digital Gold, Layer 1 of RGB Protocol',
    ls: `Documents/
  rgb-whitepaper.pdf
  rgb-spec.md
  bitcoin.pdf`,
    date: () => new Date().toLocaleString(),
    exit: 'exit'
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(' ');
    
    if (!cmd.trim()) return;
    
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (command === 'clear') {
      setHistory([]);
      return;
    }
    
    if (command === 'exit') {
      onClose();
      return;
    }

    const output = commands[command];
    if (output) {
      if (typeof output === 'function') {
        setHistory(prev => [...prev, `$ ${cmd}`, output(args.join(' '))]);
      } else {
        setHistory(prev => [...prev, `$ ${cmd}`, output]);
      }
    } else {
      setHistory(prev => [...prev, `$ ${cmd}`, `Command not found: ${command}`]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
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
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff0000] opacity-50"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffff00] opacity-50"></div>
          <div className="w-3 h-3 rounded-full bg-[#00ff41] opacity-50"></div>
          <span className="ml-2">RGB Terminal</span>
        </div>
        <button 
          onClick={onClose} 
          className="hover:text-[#008f11] px-2"
          aria-label="Close terminal"
        >
          ×
        </button>
      </div>
      <div 
        ref={terminalRef}
        className="p-4 h-[calc(100%-4rem)] overflow-y-auto font-mono"
      >
        <AnimatePresence mode="popLayout">
          {history.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="mb-1 text-[#00ff41]"
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex items-center">
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="mr-2 text-[#00ff41]"
          >
            $
          </motion.span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#00ff41] caret-[#00ff41]"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;