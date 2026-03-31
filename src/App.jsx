import { useEffect } from 'react';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import { useTelegram } from './hooks/useTelegram';
import { FortuneCookie } from './components/FortuneCookie';
import { Share } from './components/Share';
import './App.css';

const manifestUrl = 'https://your-app.com/tonconnect-manifest.json'; // In production, use your actual URL

function App() {
  const { tg, user } = useTelegram();

  useEffect(() => {
    if (tg) {
      tg.MainButton.setParams({
        text: 'DAILY REWARD',
        color: '#3390ec',
      });
      tg.MainButton.show();
    }
  }, [tg]);

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
              <span className="stat-value">1,250 💎</span>
            </div>
            <div className="stat">
              <span className="stat-label">Streak</span>
              <span className="stat-value">5 Days 🔥</span>
            </div>
          </div>

          <FortuneCookie user={user} />
          
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
