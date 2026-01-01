import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Navigation />
            <main className="container my-4">
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
}