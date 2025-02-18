import React from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

function WalletPage() {
    const [tonConnectUI] = useTonConnectUI();

    return (
        <div className="page wallet-page">
            <h1>Wallet</h1>
            {!tonConnectUI.connected ? (
                <div className="connect-container">
                    <button 
                        onClick={() => tonConnectUI.connectWallet()}
                        className="connect-button"
                    >
                        Connect TON Wallet
                    </button>
                </div>
            ) : (
                <div className="wallet-info">
                    <div className="address-card">
                        <h3>Connected Address</h3>
                        <p>{tonConnectUI.account?.address}</p>
                        <button 
                            onClick={() => tonConnectUI.disconnect()}
                            className="connect-button"
                            style={{ marginTop: '16px' }}
                        >
                            Disconnect
                        </button>
                    </div>
                    <div className="tokens-section">
                        <h3>Your Tokens</h3>
                        <div className="token-list">
                            <div className="token-card">
                                <h4>TON</h4>
                                <p className="token-balance">Loading...</p>
                            </div>
                            <div className="token-card">
                                <h4>Blum Memepad</h4>
                                <p className="token-balance">Loading...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WalletPage;