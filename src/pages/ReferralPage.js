import React, { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

function ReferralPage() {
    const [tonConnectUI] = useTonConnectUI();
    const [referralLink, setReferralLink] = useState('');
    const [referralCount, setReferralCount] = useState(0);

    const generateReferralLink = async () => {
        // TODO: Implement referral link generation
        setReferralLink('https://t.me/your_bot?start=REF123');
    };

    return (
        <div className="page referral-page">
            <h1>Referral Program</h1>
            {tonConnectUI.connected ? (
                <div className="referral-section">
                    <div className="referral-stats">
                        <h3>Your Referrals</h3>
                        <p className="referral-count">{referralCount} users</p>
                    </div>
                    <div className="referral-link-section">
                        <button 
                            onClick={generateReferralLink}
                            className="generate-link-button"
                        >
                            Generate Referral Link
                        </button>
                        {referralLink && (
                            <div className="link-display">
                                <p>Your Referral Link:</p>
                                <input 
                                    type="text"
                                    readOnly
                                    value={referralLink}
                                    className="referral-link-input"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="connect-prompt">
                    Please connect your wallet in the Wallet tab
                </div>
            )}
        </div>
    );
}

export default ReferralPage;