import React, { useState, useEffect } from 'react';
import { getTokenBalances } from '../services/ton';
import TokenDetails from './TokenDetails';

function TokenList({ wallet }) {
    const [tokens, setTokens] = useState([]);
    const [selectedToken, setSelectedToken] = useState(null);

    useEffect(() => {
        const loadTokens = async () => {
            const balances = await getTokenBalances(wallet);
            setTokens(balances);
        };
        loadTokens();
    }, [wallet]);

    return (
        <div className="token-list">
            <div className="container">
                <h2 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: '600',
                    marginBottom: '1.5rem' 
                }}>Your Portfolio</h2>
                <div className="tokens-grid">
                    {tokens.map(token => (
                        <div 
                            key={token.address} 
                            className="token-card"
                            onClick={() => setSelectedToken(token)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>{token.symbol}</h3>
                                <span style={{ 
                                    background: 'rgba(36, 129, 204, 0.1)', 
                                    padding: '4px 8px', 
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    color: '#2481cc'
                                }}>
                                    {token.symbol === 'TON' ? 'Native' : 'Token'}
                                </span>
                            </div>
                            <div style={{ 
                                marginTop: '1rem',
                                fontSize: '1.25rem',
                                fontWeight: '600'
                            }}>
                                {token.balance} {token.symbol}
                            </div>
                        </div>
                    ))}
                </div>
                {selectedToken && (
                    <TokenDetails 
                        token={selectedToken} 
                        onClose={() => setSelectedToken(null)} 
                    />
                )}
            </div>
        </div>
    );
}

export default TokenList;