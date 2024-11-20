import RelativeTime from '../components/Basic/RelativeTime';

interface Data {
  id: string;
  name: string;
  created_at: Date;
  pins_count: number;
  cover?: string;
  collage?: string[];
  its_yours?: boolean;
}

interface BoardsPreviewProps {
  data: Data;
}

const BoardPreview = ({ data }: BoardsPreviewProps) => {
  const { id, name, created_at, pins_count, cover, collage, its_yours } = data;

  return (
    <section>
      <article></article>
      <footer>
        <section>
          <strong>{name}</strong>
        </section>
        <section>
          <span>
            {pins_count} {`pins_count == 1 ? 'Pin' : 'Pins'`}
          </span>
          <RelativeTime props={{ lang: 'es', date: created_at }} />
        </section>
      </footer>
    </section>
  );
};

export default BoardPreview;
