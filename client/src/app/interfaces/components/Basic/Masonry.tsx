interface Props {
  children?: React.ReactNode;
}

export const Masonry = ({ children }: Props) => {
  return <section className='masonry'>{children}</section>;
};

export default Masonry;
