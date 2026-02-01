import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps }) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const stored = localStorage.getItem('cashflowr-theme') || 'light'
        setTheme(stored)
        document.documentElement.setAttribute('data-theme', stored)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('cashflowr-theme', newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
  }
    return (
        <>
            <Navigation theme={theme} onToggleTheme={toggleTheme} />
            <main className="container my-4">
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
}