interface Props {
  cover?: string;
}

const CoverCard = ({ cover }) => {
  return (
    <div className='min-h-[180px] w-[236]'>
      <img className='w-full h-full' src={cover} alt={`Pin body`} />
    </div>
  );
};

export default CoverCard;
