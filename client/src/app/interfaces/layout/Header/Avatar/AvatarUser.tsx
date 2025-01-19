interface AvatarUserInterface {
  data: any;
  classProps: string;
  textSize: string;
  isClickable?: boolean;
}

const AvatarUser = ({
  data,
  classProps,
  textSize,
  isClickable = true,
}: AvatarUserInterface) => {
  return (
    <>
      {data?.avatar ? (
        <div className={`${classProps}`}>
          <img
            src={data.avatar}
            className={`bg-gray-500  h-full w-full object-cover rounded-full ${
              !isClickable ? 'hover:cursor-default' : 'hover:cursor-pointer'
            }`}
          ></img>
        </div>
      ) : (
        <div
          style={{ backgroundColor: `${data?.avatar_background}` }}
          className={`bg-gray-500  ${classProps}  rounded-full flex justify-center items-center ${
            !isClickable ? 'hover:cursor-default' : 'hover:cursor-pointer'
          }`}
        >
          <span
            className={`text-black font-bold ${
              !isClickable ? 'hover:cursor-default' : 'hover:cursor-pointer'
            } ${textSize}`}
          >
            {data?.avatar_letter}
          </span>
        </div>
      )}
    </>
  );
};

export default AvatarUser;
