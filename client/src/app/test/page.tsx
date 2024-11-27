import BoardPreview from '../boards/boards-preview/BoardPreview';
import BoardsGrid from '../boards/boards-preview/BoardsGrid';

export default function Test() {
  const boards = [
    {
      id: '1',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 1,
      created_at: new Date(),
      name: 'Fútbol champagne',
      its_yours: true,
    },
    {
      id: '2',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 2989998766,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '3',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 98766,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '4',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 100,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '5',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 109876,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '6',
      pins_count: 0,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '7',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 98766,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '8',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 98766,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '9',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 98766,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '10',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 98766,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '11',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 98766,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '12',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 98766,
      created_at: new Date(),
      name: 'Fútbol champagne',
    },
    {
      id: '13',
      collage: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ',
        'https://tvazteca.brightspotcdn.com/38/e6/7b33cdd042d5a378d56a7f81fa73/perritos-primeros-auxilios.jpg',
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
      ],
      pins_count: 98766,
      created_at: new Date(),
      name: 'Fútbol champagne',
      cover:
        'https://i.ytimg.com/vi/sFbt7Icd9RI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Cw8fjqgpvwem1e8Yffvg1Nuzeg',
    },
  ];

  return <BoardsGrid boards={boards} />;
}
