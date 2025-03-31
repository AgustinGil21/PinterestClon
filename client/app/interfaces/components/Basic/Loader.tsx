interface Props {
  className?: string;
}

const Loader = ({ className }: Props) => {
  return (
    <div className={`loader-circle ${className}`}>
      <div className='loader'></div>
    </div>
  );
};

export default Loader;
