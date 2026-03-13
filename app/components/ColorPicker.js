'use client';

import { useState, useEffect, useRef } from 'react';

const PRESET_COLORS = [
    '#ffffff', 
    '#000000', 
    '#111111', 
    '#0f172a', // Slate 900
    '#0ea5e9', // Tech Blue (Sky 500)
    '#ffd700', // Gold
    '#10b981', // Emerald 500
    '#ef4444', // Red 500
    '#6366f1', // Indigo 500
    'rgba(255, 255, 255, 0.1)', // Glassmorphism white
    'rgba(0, 0, 0, 0.4)' // Dark transparent
];

export default function ColorPicker({ name, value, onChange, label, placeholder = "#000000" }) {
    const [color, setColor] = useState(value || '#ffffff');
    const [showPalette, setShowPalette] = useState(false);
    const [eyeDropperSupported, setEyeDropperSupported] = useState(
        () => typeof window !== 'undefined' && 'EyeDropper' in window
    );
    const paletteRef = useRef(null);

    useEffect(() => {
        if (value !== color) {
            setColor(value || '#ffffff'); // eslint-disable-line react-hooks/set-state-in-effect
        }
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (paletteRef.current && !paletteRef.current.contains(event.target)) {
                setShowPalette(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (newColor) => {
        setColor(newColor);
        if (onChange) {
            onChange({ target: { name, value: newColor } });
        }
    };

    const handleEyeDropper = async () => {
        if (!eyeDropperSupported) return;
        try {
            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();
            handleChange(result.sRGBHex);
        } catch (e) {
            console.log("EyeDropper canceled or failed", e);
        }
    };

    // Ensure type="color" only receives 6-character hex. It crashes on rgba.
    const isHex = color && color.startsWith('#') && (color.length === 7 || color.length === 4);

    return (
        <div style={{ position: 'relative', width: '100%' }} ref={paletteRef}>
            {label && <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{label}</label>}
            
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '4px 8px',
                position: 'relative'
            }}>
                {/* Visual Color Box (Native picker fallback if Hex) */}
                <div style={{ position: 'relative', width: '32px', height: '32px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', background: color }}>
                    {isHex && (
                        <input 
                            type="color" 
                            value={color} 
                            onChange={(e) => handleChange(e.target.value)} 
                            style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} 
                            title="Abrir Seletor Nativo"
                        />
                    )}
                </div>

                {/* Text String Input */}
                <input 
                    type="text" 
                    value={color} 
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '0.9rem',
                        outline: 'none',
                        padding: '4px'
                    }}
                />

                {/* Palette Toggle */}
                <button 
                    type="button" 
                    onClick={() => setShowPalette(!showPalette)}
                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                    title="Paleta de Cores"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                </button>

                {/* EyeDropper */}
                {eyeDropperSupported && (
                    <button 
                        type="button" 
                        onClick={handleEyeDropper}
                        style={{ background: 'transparent', border: 'none', color: '#0ea5e9', cursor: 'pointer', padding: '4px' }}
                        title="Pescar Cor da Tela (Conta-Gotas)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l-3-3Z"/><path d="m15 9 3 3"/></svg>
                    </button>
                )}
            </div>

            {/* Dropdown Palette */}
            {showPalette && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    zIndex: 50,
                    width: '220px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '0.8rem', color: '#cbd5e1', fontWeight: '500' }}>Cores Predefinidas</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {PRESET_COLORS.map(preset => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => {
                                    handleChange(preset);
                                    setShowPalette(false);
                                }}
                                style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: preset,
                                    border: color === preset ? '2px solid #0ea5e9' : '1px solid rgba(255,255,255,0.2)',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                                title={preset}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
