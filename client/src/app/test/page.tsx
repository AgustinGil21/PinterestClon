import BoardPreview from '../boards/boards-preview/BoardPreview';

export default function Test() {
  const data = {
    collage: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
      'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
      'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
    ],
    pins_count: 98766,
    created_at: new Date(),
    name: 'Fútbol champagne',
    cover:
      'https://wallpapers.com/images/hd/spiderman-background-oycfyb1ksermw921.jpg',
  };

  return (
    <div className='flex gap-4 p-8'>
      <BoardPreview data={data} />
    </div>
  );
}
