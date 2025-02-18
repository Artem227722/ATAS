import React, { useState } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import MainPage from './pages/MainPage';
import WalletPage from './pages/WalletPage';
import ReferralPage from './pages/ReferralPage';
import BottomNav from './components/BottomNav';

const manifestUrl = `${window.location.origin}/tonconnect-manifest.json`;

function App() {
    const [activePage, setActivePage] = useState('main');

    const renderContent = () => {
        switch (activePage) {
            case 'main':
                return <MainPage />;
            case 'wallet':
                return <WalletPage />;
            case 'referral':
                return <ReferralPage />;
            default:
                return <MainPage />;
        }
    };

    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <div className="app">
                <main className="main-content">
                    {renderContent()}
                </main>
                <BottomNav activePage={activePage} onPageChange={setActivePage} />
            </div>
        </TonConnectUIProvider>
    );
}

export default App;