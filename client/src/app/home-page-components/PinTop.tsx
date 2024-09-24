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
    <article className={`card-top ${containerClassProps}`}>
      <img src={body} className='card-body' alt={alt_text} />
    </article>
  );
};
