export default function JobProgressBar({ 
    progressShow = true,
    progressLabel = "Progresso para novo emprego",
    progressValue = 30,
    progressColor = "#ffd700",
    progressBgColor = "rgba(255, 255, 255, 0.1)",
    containerStyle = {}
}) {
    if (progressShow === false) return null;

    // Ensure progress is max 100
    const val = Math.min(Math.max(progressValue, 0), 100);

    const defaultStyle = { margin: '1rem auto', maxWidth: '680px', width: '100%', zIndex: 10, position: 'relative' };
    const mergedStyle = { ...defaultStyle, ...containerStyle };

    return (
        <div className="progress-container" style={mergedStyle}>
            <div className="progress-label" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="text-warning fw-bold" style={{ color: progressColor, fontWeight: 'bold', fontSize: '0.85rem' }}>
                    {val}%
                </span>
            </div>
            <div className="custom-progress" style={{ 
                height: '12px', 
                background: progressBgColor, 
                borderRadius: '10px', 
                overflow: 'hidden', 
                backdropFilter: 'blur(10px)',
                border: `1px solid ${progressBgColor}`
            }}>
                <div 
                    className="progress-bar-shine" 
                    role="progressbar" 
                    style={{ 
                        width: `${val}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${progressColor}, #ffffff, ${progressColor})`,
                        backgroundSize: '200% 100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        color: '#fff',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        transition: 'width .6s ease'
                    }} 
                />
            </div>
        </div>
    );
}
