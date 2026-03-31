export function Share({ tg, user }) {
  const referralLink = `https://t.me/bottele_bot?start=ref_${user?.id || '0'}`;

  const handleShare = () => {
    if (!tg) return;
    tg.openTelegramLink(
      `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Crack your daily fortune and earn TON points!`
    );
  };

  return (
    <div className="share-container">
      <button className="share-btn" onClick={handleShare}>
        Invite Friends (+10 Points)
      </button>
    </div>
  );
}
