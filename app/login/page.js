"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        
        const result = await signIn("credentials", {
            username,
            password,
            redirect: true,
            callbackUrl: "/admin",
        });

        if (result?.error) {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif', padding: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
                <h1 style={{ margin: '0 0 10px', fontSize: '24px', color: '#333' }}>Acesso Restrito</h1>
                <p style={{ margin: '0 0 30px', color: '#666', fontSize: '14px' }}>
                    Área administrativa exclusiva.
                </p>

                {/* Login Form */}
                <form onSubmit={handlePasswordLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #eee' }}>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                        disabled={loading}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                        disabled={loading}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: '#000',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            fontSize: '16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Entrando...' : 'Entrar com Senha'}
                    </button>
                    {error && <p style={{ color: 'red', fontSize: '13px', margin: '5px 0 0' }}>Senha incorreta.</p>}
                </form>

                <p style={{ color: '#999', fontSize: '12px', marginBottom: '15px' }}>OU</p>

                <button
                    onClick={() => signIn('google', { callbackUrl: '/admin' })}
                    style={{
                        backgroundColor: '#4285F4',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google (Somente Admin)
                </button>
            </div>
        </div>
    );
}
