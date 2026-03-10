import './animated-bg.css';

export default function FloatingIcons({ type = "finance" }) {
  if (type === "none" || !type) return null;

  return (
    <div className="floating-elements">
      {type === "finance" && (
        <>
          <div className="floating-element" style={{ top: '10%', left: '10%' }}>
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="floating-element" style={{ top: '20%', right: '15%' }}>
            <i className="fas fa-robot"></i>
          </div>
          <div className="floating-element" style={{ bottom: '30%', left: '5%' }}>
            <i className="fas fa-coins"></i>
          </div>
          <div className="floating-element" style={{ bottom: '15%', right: '10%' }}>
            <i className="fas fa-network-wired"></i>
          </div>
        </>
      )}

      {type === "construction" && (
        <>
          <div className="floating-element" style={{ top: '10%', left: '10%' }}>
            <i className="fas fa-hammer"></i>
          </div>
          <div className="floating-element" style={{ top: '20%', right: '15%' }}>
            <i className="fas fa-paint-roller"></i>
          </div>
          <div className="floating-element" style={{ bottom: '30%', left: '5%' }}>
            <i className="fas fa-hard-hat"></i>
          </div>
          <div className="floating-element" style={{ bottom: '15%', right: '10%' }}>
            <i className="fas fa-tools"></i>
          </div>
        </>
      )}
    </div>
  );
}
