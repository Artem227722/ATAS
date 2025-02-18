import React from 'react';
import { api } from '../services/api';

function RaffleSection({ wallet }) {
    const handleRaffleEntry = async () => {
        try {
            await api.post('/raffle/enter', {
                userId: wallet.address,
                raffleId: 'current_ton_raffle'
            });
            alert('Successfully entered the raffle!');
        } catch (error) {
            console.error('Failed to enter raffle:', error);
            alert('Failed to enter raffle');
        }
    };

    return (
        <div className="raffle-section">
            <h2>Current Raffle</h2>
            <div className="raffle-card">
                <h3>200 TON Giveaway</h3>
                <p>Enter now for a chance to win!</p>
                <button onClick={handleRaffleEntry} className="enter-raffle-btn">
                    Participate
                </button>
            </div>
        </div>
    );
}

export default RaffleSection;
