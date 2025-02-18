import React from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

function MainPage() {
    const [tonConnectUI] = useTonConnectUI();

    const raffles = [
        {
            id: 1,
            prize: '50 TON',
            requirement: '24h holders of the token',
            minAmount: 0
        },
        {
            id: 2,
            prize: '100 TON',
            requirement: '24h holders',
            minAmount: 20000000
        },
        {
            id: 3,
            prize: '200 TON',
            requirement: 'Top referrers holding 24h+',
            minAmount: 0
        }
    ];

    return (
        <div className="page main-page">
            <h1>Main</h1>
            {tonConnectUI.connected ? (
                <>
                    <div className="balance-card">
                        <h2>Your Balance</h2>
                        <div className="balance-amount">0 TON</div>
                    </div>
                    <div className="raffles-section">
                        <h2>Active Raffles</h2>
                        {raffles.map(raffle => (
                            <div key={raffle.id} className="raffle-card">
                                <h3>{raffle.prize} Giveaway</h3>
                                <p>{raffle.requirement}</p>
                                {raffle.minAmount > 0 && (
                                    <p>Minimum: {raffle.minAmount.toLocaleString()} tokens</p>
                                )}
                                <button className="participate-button">
                                    Participate
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="connect-prompt">
                    Please connect your wallet in the Wallet tab
                </div>
            )}
        </div>
    );
}

export default MainPage;