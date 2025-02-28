'use client';

import { useEffect, useState } from 'react';
import { Roboto, Poppins, Inter } from 'next/font/google';
import { Header } from './interfaces/layout/Header/Header';
import './globals.css';
import DataDevs from './interfaces/layout/DataDevs';
import { usePathname } from 'next/navigation';
import AsideConfig from './interfaces/layout/settingsConfig/AsideSettings';
import { useAppsStore } from './infrastructure/stores/useAppStore';
import { changeDocTitle } from './libs/changeDocTitle';
import ToastNotification from './components/Basic/ToastNotification';
import BoardsListModal from './boards/boards-list/BoardsListModal';
import { SharePinModal } from './home-page-components/SharePinModal';
import PinMoreOptionsModal from './home-page-components/PinMoreOptionsModal';
import { DynamicShareBoardModal } from './board/DynamicShareBoardModal';
import { DynamicMoreOptionsBoardModal } from './board/DynamicMoreOptionsBoardModal';
import AsideSettingsInfoClon from './interfaces/layout/AsideInfoClon/AsideSettingsInfoClon';
import { AdultContentModal } from './home-page-components/AdultContentModal';
import { MobileController } from './home-page-components/MobileController';
import { useGetScreenSize } from './hooks/useGetScreenSize';

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
  const {
    userPublicData,
    toastNotificationContent,
    isOpenMenuAsideSettingsResponsive,
    isAuth,
    dynamicModalIsOpen,
    userLang,
    getTranslation,
    isPinMoreOptionModalOpen,
    shareBoardModalIsOpen,
    boardMoreOptionsModalIsOpen,
    adultContentModalIsOpen,
    mobileSavePinControllerIsActive,
  } = useAppsStore();
  const { width } = useGetScreenSize();

  const pathname = usePathname();
  const routesWithoutHeader = ['/recover-password'];
  const routesWithoutAside = [
    '/edit-user',
    '/privacy-info',
    '/admin-user',
    '/security-profile',
  ];

  const routesWithoutAsideInfoClon = [
    '/info-clon',
    '/technologies',
    '/about-us',
  ];

  const routeCreatePin = ['/create-pin'];

  const [isHeaderLoaded, setIsHeaderLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleHeaderLoaded = () => {
    setIsHeaderLoaded(true);
  };

  useEffect(() => {
    getTranslation(userLang);
  }, [userLang]);

  useEffect(() => {
    if (userPublicData) {
      setIsLoading(false);
    }
  }, [userPublicData]);

  useEffect(() => {
    changeDocTitle('PinterestClon');
  }, [pathname]);

  if (isLoading) {
    return null;
  }

  return (
    <html lang='en'>
      <body
        className={`${roboto.className} ${
          inter.className
        } dark:bg-gray-900 p-0 ${
          !routeCreatePin.includes(pathname) ? 'overflowBody' : ''
        }`}
        style={{ padding: '0' }}
      >
        {!routesWithoutHeader.includes(pathname) && <Header />}
        <DataDevs />

        <main className={`flex pt-16 relative overflow-x-hidden`}>
          {isAuth && routesWithoutAside.includes(pathname) && <AsideConfig />}
          {routesWithoutAsideInfoClon.includes(pathname) && (
            <AsideSettingsInfoClon />
          )}
          {children}
          {toastNotificationContent?.status && (
            <ToastNotification
              key={`${toastNotificationContent.status}:${toastNotificationContent.type}:${toastNotificationContent.action}`}
              content={toastNotificationContent}
            />
          )}

          {mobileSavePinControllerIsActive && width < 769 && (
            <MobileController />
          )}
          {width > 768 && <BoardsListModal />}
          <SharePinModal />
          {isPinMoreOptionModalOpen && <PinMoreOptionsModal />}
          {shareBoardModalIsOpen && <DynamicShareBoardModal />}
          {boardMoreOptionsModalIsOpen && <DynamicMoreOptionsBoardModal />}
          {adultContentModalIsOpen && <AdultContentModal />}
        </main>
      </body>
    </html>
  );
}
