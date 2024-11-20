interface DownloadIconInterface {
  isDownloadAccountOpen: boolean;
}

const DownloadIcon = ({ isDownloadAccountOpen }: DownloadIconInterface) => {
  return (
    <svg
      aria-hidden='true'
      aria-label=''
      className='Uvi gUZ U9O kVc'
      height='20'
      role='img'
      viewBox='0 0 24 24'
      width='20'
      fill={isDownloadAccountOpen ? 'white' : 'currentColor'}
    >
      <path d='M7.44 5.44a1.5 1.5 0 1 0 2.12 2.12l.94-.94v6.88a1.5 1.5 0 0 0 3 0V6.62l.94.94a1.5 1.5 0 0 0 2.12-2.12l-3.5-3.5a1.5 1.5 0 0 0-2.12 0zM5 13.5a1.5 1.5 0 0 0-3 0v5A3.5 3.5 0 0 0 5.5 22h13a3.5 3.5 0 0 0 3.5-3.5v-5a1.5 1.5 0 0 0-3 0v5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5z'></path>
    </svg>
  );
};

export default DownloadIcon;
