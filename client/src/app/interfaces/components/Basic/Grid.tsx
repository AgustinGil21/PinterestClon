interface Props {
  children?: React.ReactNode;
}

const Grid = ({ children }: Props) => {
  return (
    <section className='grid gap-4 p-4 w-full h-full grid-cols-[repeat(auto-fit,minmax(247.6px,1fr))]'>
      {children}
    </section>
  );
};

export default Grid;
