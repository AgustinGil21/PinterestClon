'use client';

import { useRouter } from 'next/navigation';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import ArrowTwoLeftIcon from '../interfaces/components/icons/ArrowTwoLeftIcon';
import { FaAngleLeft } from 'react-icons/fa';

export const BoardGoBackBtn = () => {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <button
      className=' hover:bg-gray-200 rounded-full p-2 md:hidden '
      onClick={handleGoBack}
    >
      <FaAngleLeft size={20} />
    </button>
  );
};
