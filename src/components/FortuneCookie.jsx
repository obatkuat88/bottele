import { useState } from 'react';
import { motion } from 'framer-motion';
import './FortuneCookie.css';

const FORTUNES = [
  "Today, your luck is as bright as the TON sun.",
  "A small gain today will lead to a big reward tomorrow.",
  "Patience is the key to mastering the blockchain.",
  "Your wallet will smile upon you soon.",
  "An unexpected message will bring joy to your Telegram.",
  "Trust the process; the block is still being confirmed.",
  "A new opportunity is waiting for you in the next chat.",
  "Your streak is your strength."
];

export function FortuneCookie({ user, onRewardClaimed, lastCracked }) {
  const isCrackedToday = lastCracked === new Date().toDateString();
  const [cracked, setCracked] = useState(isCrackedToday);
  const [fortune, setFortune] = useState(isCrackedToday ? "You already received your fortune today. Come back tomorrow!" : "");
  const [reward, setReward] = useState(0);

  const handleCrack = () => {
    if (cracked) return;
    const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    const gainedPoints = Math.floor(Math.random() * 50) + 50; // 50 to 100 points
    
    setFortune(randomFortune);
    setReward(gainedPoints);
    setCracked(true);
    
    if (onRewardClaimed) onRewardClaimed(gainedPoints);
  };

  return (
    <div className="cookie-container">
      {!cracked ? (
        <motion.div 
          className="cookie"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: 5 }}
          onClick={handleCrack}
        >
          🥠
          <p className="hint">Tap to crack your daily fortune!</p>
        </motion.div>
      ) : (
        <motion.div 
          className="fortune-revealed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="cookie-pieces">✨ 🥠 ✨</div>
          <p className="fortune-text">"{fortune}"</p>
          {reward > 0 && <p className="reward-text" style={{ color: '#4caf50', fontWeight: 'bold' }}>You earned +{reward} 💎</p>}
          <p className="user-greeting">Good luck, {user?.first_name || 'Friend'}!</p>
        </motion.div>
      )}
    </div>
  );
}
