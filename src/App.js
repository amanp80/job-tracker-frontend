import React from 'react';
import { useAuth } from './context/AuthContext';
import MainLayout from './pages/MainLayout';
import AuthPage from './pages/AuthPage';
import Spinner from './components/Spinner';

function App() {
    const { token, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    return token ? <MainLayout /> : <AuthPage />;
}

export default App;
