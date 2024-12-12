import InteractionSummary from '../components/Basic/InteractionSummary';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import PinterestLogo from '../interfaces/components/icons/PinterestLogo';

const DataUser = ({ data }: { data: any }) => {
  const { getFollowersList } = useAppsStore();

  const handleClick = () => {
    getFollowersList(data.username);
  };

  return (
    <div className='flex flex-col gap-2 justify-center text-center mt-3 dark:text-white'>
      <h3 className='text-3xl font-bold '>
        {data.name ? `${data.name} ${data?.surname}` : data.username}
      </h3>

      {data.website && (
        <a
          href={data.website}
          className='text-[15px] font-bold text-center max-w-[800px] cursor-pointer hover:underline'
        >
          {data.website}
        </a>
      )}

      {data.about && (
        <p className='text-[15px] text-center max-w-[800px]'>{data.about}</p>
      )}

      <div
        className='text-[13px] flex flex-row justify-center  items-center gap-1
           '
      >
        <PinterestLogo
          color='#5d5d5d  '
          classProps='w-[15px] h-[15px] mb-[3px]'
        />
        <span className='text-gray-600 text-center  dark:text-white'>
          {data.username}
        </span>
      </div>

      <div className='flex flex-row gap-2 justify-center'>
        {data.followers_count !== '0' && (
          <>
            <button
              className='text-[15px] font-semibold cursor-pointer'
              onClick={handleClick}
            >
              <InteractionSummary
                type='followers'
                value={data.followers_count}
                lang='es'
                className='flex gap-1'
                numberFirst
              />
            </button>
            <span> · </span>
          </>
        )}

        <p className='text-[15px] font-semibold cursor-pointer'>
          <InteractionSummary
            type='following'
            value={data.following_count}
            lang='es'
            className='flex gap-1'
          />
        </p>
      </div>
    </div>
  );
};

export default DataUser;
