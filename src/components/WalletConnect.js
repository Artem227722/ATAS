import React from 'react';
import { useTonConnect } from '../services/ton';

function WalletConnect() {
    const { connect, disconnect, connected, address, loading } = useTonConnect();

    return (
        <div className="wallet-connect">
            {!connected ? (
                <button 
                    onClick={connect} 
                    className="connect-button"
                    disabled={loading}
                >
                    {loading ? 'Connecting...' : 'Connect TON Wallet'}
                </button>
            ) : (
                <div className="wallet-info">
                    <span>Connected: {address}</span>
                    <button 
                        onClick={disconnect}
                        className="connect-button"
                        style={{ marginTop: '8px' }}
                    >
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
}

export default WalletConnect;