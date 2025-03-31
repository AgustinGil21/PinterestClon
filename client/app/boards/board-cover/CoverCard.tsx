interface Props {
  cover: string;
  isSelected: boolean;
  onSelect: () => void;
}

const CoverCard = ({ cover, isSelected, onSelect }: Props) => {
  return (
    <div
      className={`min-h-[100px] w-full hover:scale-[1.05] transition-[filter,transform,colors] pin-cover-card hover:cursor-pointer max-w-[200px] min-w-[130px] hover:brightness-50 mb-4 rounded-xl ${
        isSelected ? 'cover-selected' : ''
      }`}
      onClick={onSelect}
    >
      <img
        className={`w-full h-full rounded-xl `}
        src={cover}
        alt={`Pin body`}
      />
    </div>
  );
};

export default CoverCard;
