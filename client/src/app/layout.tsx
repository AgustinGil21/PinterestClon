'use client';
import { Roboto, Poppins, Inter } from 'next/font/google';
import { Header } from './components/Header/Header';
import './globals.css';
import DataDevs from './components/DataDevs';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const routesWithoutHeader = ['/recover-password'];

  return (
    <html lang='en'>
      <body
        className={`${roboto.className} ${inter.className} dark:bg-gray-900`}
      >
        {!routesWithoutHeader.includes(pathname) && <Header />}
        <DataDevs />
        <main>{children}</main>
      </body>
    </html>
  );
}
