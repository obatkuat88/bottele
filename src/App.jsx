import { useEffect, useState } from 'react';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import { useTelegram } from './hooks/useTelegram';
import { FortuneCookie } from './components/FortuneCookie';
import { Share } from './components/Share';
import './App.css';

const manifestUrl = 'https://obatkuat88.github.io/bottele/tonconnect-manifest.json';

function App() {
  const { tg, user } = useTelegram();

  const [points, setPoints] = useState(() => parseInt(localStorage.getItem('fortune_points') || '0'));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('fortune_streak') || '0'));
  const [lastCracked, setLastCracked] = useState(() => localStorage.getItem('fortune_last_cracked') || null);

  useEffect(() => {
    localStorage.setItem('fortune_points', points.toString());
    localStorage.setItem('fortune_streak', streak.toString());
    if (lastCracked) localStorage.setItem('fortune_last_cracked', lastCracked);
  }, [points, streak, lastCracked]);

  const handleRewardClaimed = (amount) => {
    setPoints(prev => prev + amount);
    const today = new Date().toDateString();
    
    // Check if streak applies
    if (lastCracked) {
      const lastDate = new Date(lastCracked);
      const diffTime = Math.abs(new Date() - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 1) {
        setStreak(prev => prev + 1);
      } else if (diffDays > 1) {
        setStreak(1);
      }
    } else {
      setStreak(1);
    }
    
    setLastCracked(today);
  };

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className="app-container">
        <header className="app-header">
          <div className="user-info">
            {user?.photo_url && <img src={user.photo_url} alt="Profile" className="user-avatar" />}
            <span className="user-name">@{user?.username || 'user'}</span>
          </div>
          <TonConnectButton />
        </header>

        <main className="app-main">
          <div className="stats-card">
            <div className="stat">
              <span className="stat-label">Points</span>
              <span className="stat-value">{points.toLocaleString()} 💎</span>
            </div>
            <div className="stat">
              <span className="stat-label">Streak</span>
              <span className="stat-value">{streak} Days 🔥</span>
            </div>
          </div>

          <FortuneCookie user={user} onRewardClaimed={handleRewardClaimed} lastCracked={lastCracked} />
          
          <Share tg={tg} user={user} />
        </main>
        
        <footer className="app-footer">
          <p>TON Fortune Cookie v1.0.0</p>
        </footer>
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
