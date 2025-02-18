import React, { useState } from 'react';
import { api } from '../services/api';

function ReferralSystem({ wallet }) {
    const [referralLink, setReferralLink] = useState('');
    const [referralCount, setReferralCount] = useState(0);

    const generateReferralLink = async () => {
        try {
            const response = await api.post('/referral/create', {
                userId: wallet.address
            });
            const { referralCode } = response.data;
            setReferralLink(`https://t.me/your_bot?start=${referralCode}`);
        } catch (error) {
            console.error('Failed to generate referral link:', error);
        }
    };

    return (
        <div className="referral-system">
            <h2>Referral Program</h2>
            <button onClick={generateReferralLink} className="generate-link-btn">
                Generate Referral Link
            </button>
            {referralLink && (
                <div className="referral-info">
                    <p>Your Referral Link:</p>
                    <input 
                        type="text" 
                        value={referralLink} 
                        readOnly 
                        className="referral-link-input"
                    />
                    <p>Referrals: {referralCount}</p>
                </div>
            )}
        </div>
    );
}

export default ReferralSystem;
