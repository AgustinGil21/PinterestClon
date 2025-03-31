interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Grid = ({ children, className }: Props) => {
  return (
    <section
      className={`grid gap-4 p-4 w-full grid-cols-[repeat(auto-fit,minmax(190px,max-content))] ${className}`}
    >
      {children}
    </section>
  );
};

export default Grid;
