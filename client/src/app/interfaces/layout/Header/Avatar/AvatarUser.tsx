interface AvatarUserInterface {
  data: any;
  classProps: string;
  textSize: string;
}

const AvatarUser = ({ data, classProps, textSize }: AvatarUserInterface) => {
  return (
    <>
      {data.avatar ? (
        <div className={`${classProps}`}>
          <img
            src={data.avatar}
            className={`bg-gray-500  h-full w-full object-cover rounded-full`}
          ></img>
        </div>
      ) : (
        <div
          style={{ backgroundColor: `${data.avatar_background}` }}
          className={`bg-gray-500  ${classProps}  rounded-full flex justify-center items-center`}
        >
          <span className={`text-black font-bold ${textSize}`}>
            {data.avatar_letter}
          </span>
        </div>
      )}
    </>
  );
};

export default AvatarUser;
