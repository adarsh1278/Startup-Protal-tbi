'use client';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from '@/store/store';

// Load local fonts
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="top-center" toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#2E7D32',
              color: '#fff',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#D32F2F',
              color: '#fff',
            },
          },
        }} />
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
