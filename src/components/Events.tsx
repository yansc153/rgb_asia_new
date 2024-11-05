import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventsProps {
  onClose: () => void;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  images: string[];
  category: 'shenzhen' | 'chengdu' | 'kunming';
}

const Events = ({ onClose }: EventsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'shenzhen' | 'chengdu' | 'kunming'>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 'sz1',
      title: '深圳首届RGB技术交流会',
      date: '2024-08-11',
      location: '深圳市南山区',
      description: '首届RGB技术交流会，探讨RGB协议的技术细节和应用场景。',
      images: ['sz_event1.jpg', 'sz_event2.jpg'],
      category: 'shenzhen'
    },
    {
      id: 'cd1',
      title: '成都RGB开发者大会',
      date: '2024-08-24',
      location: '成都市高新区',
      description: 'RGB让BTC更加伟大',
      images: ['cd_event1.jpg', 'cd_event2.jpg'],
      category: 'chengdu'
    },
    {
      id: 'km1',
      title: '昆明RGB生态论坛',
      date: '2024-11-03',
      location: '昆明市',
      description: 'RGB协议：真正能释放BTCFI万亿市场潜能',
      images: ['km_event1.jpg', 'km_event2.jpg'],
      category: 'kunming'
    }
  ];

  const categories = [
    { id: 'all', name: '全部活动' },
    { id: 'shenzhen', name: '深圳活动' },
    { id: 'chengdu', name: '成都活动' },
    { id: 'kunming', name: '昆明活动' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

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
        <span>线下活动</span>
        <button onClick={onClose} className="hover:text-[#008f11]">×</button>
      </div>

      <div className="p-8">
        <div className="flex justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`px-4 py-2 border border-[#00ff41] ${
                selectedCategory === category.id ? 'bg-[#00ff41] text-[#0D0208]' : 'hover:bg-[#00ff41]/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedEvent(event)}
              className="border border-[#00ff41] p-6 cursor-pointer hover:bg-[#00ff41]/10"
            >
              <h3 className="text-xl mb-2">{event.title}</h3>
              <p className="text-sm mb-2">📅 {event.date}</p>
              <p className="text-sm mb-2">📍 {event.location}</p>
              <p className="text-sm opacity-80">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#0D0208] border border-[#00ff41] p-6 m-4 max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">{selectedEvent.title}</h2>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="hover:text-[#008f11]"
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <p className="mb-2">📅 {selectedEvent.date}</p>
                <p className="mb-2">📍 {selectedEvent.location}</p>
                <p className="opacity-80">{selectedEvent.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {selectedEvent.images.map((image, index) => (
                  <div 
                    key={index}
                    className="border border-[#00ff41] p-2 text-center"
                  >
                    图片 {index + 1}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Events;