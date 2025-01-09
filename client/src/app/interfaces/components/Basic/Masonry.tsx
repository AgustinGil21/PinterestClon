interface Props {
  children?: React.ReactNode;
  small?: boolean;
  className?: string;
}

export const Masonry = ({ children, small = false, className }: Props) => {
  return (
    <section className={` ${small ? 'masonry-small' : 'masonry'} ${className}`}>
      {children}
    </section>
  );
};

export default Masonry;
