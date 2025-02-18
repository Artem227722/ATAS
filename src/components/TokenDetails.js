import React, { useState, useEffect } from 'react';
import { getTokenInfo } from '../services/ton';

function TokenDetails({ token, onClose }) {
    const [tokenInfo, setTokenInfo] = useState(null);

    useEffect(() => {
        const loadTokenInfo = async () => {
            const info = await getTokenInfo(token.address);
            setTokenInfo(info);
        };
        loadTokenInfo();
    }, [token]);

    return (
        <div className="token-details-modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>{token.symbol} Details</h2>
                {tokenInfo && (
                    <div className="token-stats">
                        <div className="stat">
                            <label>Burned:</label>
                            <span>{tokenInfo.burned}</span>
                        </div>
                        <div className="stat">
                            <label>Locked:</label>
                            <span>{tokenInfo.locked}</span>
                        </div>
                        <div className="stat">
                            <label>Lock Period:</label>
                            <span>{tokenInfo.lockPeriod}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TokenDetails;
