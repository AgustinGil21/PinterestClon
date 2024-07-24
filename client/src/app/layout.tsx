import type { Metadata } from 'next';
import { Roboto, Inter } from 'next/font/google';
import { Header } from './components/Header/Header';
import './globals.css';
import DataDevs from './components/DataDevs';

const inter = Inter({ subsets: ['latin'] });

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pinterest Clon',
  description: 'Pinterest Clon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} ${inter.className}`}>
        <Header />
        <DataDevs />
        {children}
      </body>
    </html>
  );
}
