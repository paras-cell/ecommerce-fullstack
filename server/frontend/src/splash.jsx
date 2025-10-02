import "./splash.css"; // Optional CSS file

function SplashScreen() {
  return (
    <div className="splash-container">
        <img className="spback" src="/spback.gif" alt="" />
      <h1 className="splash-title">Welcome to PShop</h1>
      <p className="splash-subtitle">One Destination. Infinite Looks.</p>
    </div>
  );
}

export default SplashScreen;