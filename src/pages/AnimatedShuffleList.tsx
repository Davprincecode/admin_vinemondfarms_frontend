import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const itemsData = [
  { id: 1, title: 'Netscape 2.0 shjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjips', date: 'Sep 18th, 1995' },
  { id: 2, title: 'AJAX spec released', date: 'Feb 18th, 2005' },
  { id: 3, title: 'jQuery 1.0 released', date: 'Aug 26th, 2006' },
  { id: 4, title: 'First underscore.js commit', date: 'Oct 25th, 2009' },
  { id: 5, title: 'Backbone.js released', date: 'Oct 13th, 2010' },
  { id: 6, title: 'Angular 1.0 released', date: 'Mar 14th, 2012' },
  { id: 7, title: 'React open-sourced', date: 'May 29th, 2013' },
];

const AnimatedShuffleList = () => {
  const [items, setItems] = useState(itemsData);
// useEffect(() => {
//   const interval = setInterval(() => {
//     shuffleLeft(); // or shuffleRight();
//   }, 1000);
//   return () => clearInterval(interval);
// }, []);

  // Shuffle left
  const shuffleLeft = () => {
    const [first, ...rest] = items;
    setItems([...rest, first]);
  };

  // Shuffle right
  const shuffleRight = () => {
    const last = items[items.length - 1];
    const rest = items.slice(0, -1);
    setItems([last, ...rest]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between mb-4">
        <button onClick={shuffleLeft} className="bg-pink-500 text-white px-4 py-2 rounded">←</button>
        <button onClick={shuffleRight} className="bg-purple-500 text-white px-4 py-2 rounded">→</button>
      </div>

      <div className="space-y-3">
        {/* <AnimatePresence> */}
          {items.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded shadow"
              style={{border : "1px solid"}}
            >
              <h4 className="font-bold">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.date}</p>
            </motion.div>
          ))}
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
};

export default AnimatedShuffleList;
