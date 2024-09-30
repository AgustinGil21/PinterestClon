interface PinTopInterface {
  body: string;
  alt_text: string;
  url?: string;
  containerClassProps?: string;
}

export const PinTop = ({
  body,
  alt_text,
  url,
  containerClassProps,
}: PinTopInterface) => {
  return (
    <article
      className={`w-full m-0 rounded-[16px] transition-all hover:brightness-75 ${containerClassProps}`}
    >
      <img src={body} className='rounded-[16px] w-full' alt={alt_text} />
    </article>
  );
};
