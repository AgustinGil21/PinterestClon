'use client';
import { Roboto, Poppins, Inter } from 'next/font/google';
import { Header } from './interfaces/layout/Header/Header';
import './globals.css';
import DataDevs from './interfaces/layout/DataDevs';
import { usePathname } from 'next/navigation';
import AsideConfig from './interfaces/layout/settingsConfig/AsideSettings';
import { useAppsStore } from './infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';

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
  const { userPublicData } = useAppsStore();
  const pathname = usePathname();
  const routesWithoutHeader = ['/recover-password'];
  const routesWithoutAside = [
    '/edit-user',
    '/privacy-info',
    '/admin-user',
    '/security-profile',
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userPublicData) {
      setIsLoading(false);
    }
  }, [userPublicData]);

  if (isLoading) {
    return null;
  }

  return (
    <html lang='en'>
      <body
        className={`${roboto.className} ${inter.className} dark:bg-gray-900 p-0`}
        style={{ padding: '0' }}
      >
        {!routesWithoutHeader.includes(pathname) && <Header />}
        <DataDevs />

        <main className='flex '>
          {routesWithoutAside.includes(pathname) && <AsideConfig />}
          {children}
        </main>
      </body>
    </html>
  );
}
