import { useState, useEffect, createContext, useContext } from 'react';
import TonConnect from '@tonconnect/sdk';

const TonConnectContext = createContext(null);

// Initialize TonConnect with proper configuration
const connector = new TonConnect({
    manifestUrl: `${window.location.origin}/tonconnect-manifest.json`,
    // Required for Telegram Mini App
    buttonRootId: "ton-connect-button",
    walletsListSource: 'https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets.json'
});

export function TonConnectProvider({ children }) {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeConnection = async () => {
            try {
                setLoading(true);
                console.log('Initializing TON Connect...');

                // Check if we're in Telegram Mini App context
                if (!window.Telegram?.WebApp) {
                    throw new Error('This app must be opened in Telegram');
                }

                await connector.restoreConnection();
                console.log('Connection restored successfully');

                connector.onStatusChange(wallet => {
                    console.log('Wallet status changed:', wallet);
                    if (wallet) {
                        setConnected(true);
                        setAddress(wallet.account.address);
                        setError(null);
                    } else {
                        setConnected(false);
                        setAddress(null);
                    }
                    setLoading(false);
                });
            } catch (err) {
                console.error('Failed to restore connection:', err);
                setError('Failed to restore connection: ' + err.message);
                setLoading(false);
            }
        };

        initializeConnection();

        return () => {
            connector.disconnect();
        };
    }, []);

    const connect = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Attempting to connect to TON wallet...');

            // Get available wallets
            const walletsList = await connector.getWallets();
            console.log('Available wallets:', walletsList);

            if (!walletsList.length) {
                throw new Error('No TON wallets found. Please install @tonkeeper or @tonhub in Telegram.');
            }

            // Find Tonkeeper or a suitable wallet
            const preferredWallet = walletsList.find(w => 
                w.name.toLowerCase().includes('tonkeeper') || 
                w.name.toLowerCase().includes('tonhub')
            ) || walletsList[0];

            console.log('Selected wallet:', preferredWallet.name);

            // Connect using Universal URL for Telegram Mini App
            const result = await connector.connect({
                jsBridgeKey: 'tonconnect',
                universalUrl: preferredWallet.universalUrl,
                bridgeUrl: preferredWallet.bridgeUrl
            });

            console.log('Connection result:', result);

            if (!result) {
                throw new Error('Failed to connect to wallet. Please try again.');
            }

        } catch (error) {
            console.error('Connection failed:', error);
            setError(error.message || 'Failed to connect to wallet. Make sure you have a TON wallet installed.');
            setLoading(false);
        }
    };

    const disconnect = async () => {
        try {
            console.log('Disconnecting from wallet...');
            await connector.disconnect();
            setError(null);
            console.log('Successfully disconnected');
        } catch (error) {
            console.error('Disconnection failed:', error);
            setError('Failed to disconnect from wallet: ' + error.message);
        }
    };

    return (
        <TonConnectContext.Provider value={{ 
            connect, 
            disconnect, 
            connected, 
            address, 
            loading,
            error 
        }}>
            {children}
        </TonConnectContext.Provider>
    );
}

export function useTonConnect() {
    const context = useContext(TonConnectContext);
    if (!context) {
        throw new Error('useTonConnect must be used within a TonConnectProvider');
    }
    return context;
}

export async function getTokenBalances(wallet) {
    // Mock implementation - replace with actual TON API calls
    return [
        { address: '0x1', symbol: 'TON', balance: '100' },
        { address: '0x2', symbol: 'BLUM', balance: '1000' }
    ];
}

export async function getTokenInfo(tokenAddress) {
    // Mock implementation - replace with actual token contract calls
    return {
        burned: '1000000',
        locked: '5000000',
        lockPeriod: '90 days'
    };
}