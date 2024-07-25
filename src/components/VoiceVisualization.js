import React from 'react';
import { motion } from 'framer-motion';

const VoiceVisualization = ({ isSpeaking }) => {
  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
      }}
    >
      {/* 첫 번째 원 */}
      <motion.div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #6100FF, #00FFFF)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 두 번째 원 */}
      <motion.div
        style={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #0075FF 29%, #00A3FF)',
          filter: 'blur(15px)',
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 중앙 도형 */}
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 60,
          zIndex: 2,
        }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: 'white',
              margin: '0 5px',
            }}
            animate={isSpeaking ? {
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            } : {
              scale: 1,
              opacity: 0.7,
            }}
            transition={isSpeaking ? {
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.15,
            } : {
              duration: 0,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default VoiceVisualization;