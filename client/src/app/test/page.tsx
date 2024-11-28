import BoardsList from '../boards/boards-list/BoardsList';
import BoardsListModal from '../boards/boards-list/BoardsListModal';

export default function Test() {
  const boards = [
    {
      name: 'Almas oscuras, el juego',
      id: '1',
      cover:
        'https://static.bandainamcoent.eu/high/dark-souls/brand-setup/ds3_thumb_brand_624x468.jpg',
    },
    {
      name: 'La chota que se comió tu vieja ayer',
      id: '2',
      collage: [
        'https://img.freepik.com/vector-gratis/pepino-vegetal-dibujos-animados-vector-icono-ilustracion-comida-naturaleza-icono-concepto-aislado-premium-plano_138676-5147.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAqQI0OdhfqyoOKYLiTFlCGLWhFXodHorP0g&s',
        'https://billiken.lat/wp-content/uploads/2024/02/cuerpo-38.jpg',
      ],
    },
    {
      name: 'Buscando a tu hermana',
      id: '3',
    },
  ];

  return <BoardsListModal boards={boards} />;
}
