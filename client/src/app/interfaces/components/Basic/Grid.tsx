interface Props {
  children?: React.ReactNode;
}

const Grid = ({ children }: Props) => {
  return (
    <section className='grid gap-4 p-4 w-full grid-cols-[repeat(auto-fit,minmax(180px,247.6px))]'>
      {children}
    </section>
  );
};

export default Grid;
