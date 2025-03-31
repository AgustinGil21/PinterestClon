import { FullDate } from '../../../../components/Basic/FullDate';
import { CustomDate } from '../../../../domain/types/boards-interface';
import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';

interface Props {
  date: CustomDate;
  title?: string;
}

export const PreviousPinsData = ({ date, title }: Props) => {
  const { userLang } = useAppsStore();

  return (
    <div
      className={`flex flex-col w-full overflow-hidden md:max-w-[145px] max-w-[180px] justify-between h-full text-nowrap`}
    >
      {title && (
        <p className='text-sm text-ellipsis w-full overflow-hidden font-semibold'>
          {title}
        </p>
      )}
      <FullDate
        lang={userLang}
        date={date}
        className='text-sm font-semibold text-[#8d8d8d] group-hover:text-[#6d6d6d] transition-colors'
      />
    </div>
  );
};
