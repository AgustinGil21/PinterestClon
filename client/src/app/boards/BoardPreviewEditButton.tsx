import ButtonStyled from '../components/Basic/ButtonStyled';

interface BoardPreviewEditButtonProps {
  boardID: string;
  className: string;
}

const BoardPreviewEditButton = ({
  boardID,
  className,
}: BoardPreviewEditButtonProps) => {
  return (
    <ButtonStyled className={className} disabled={false}>
      Edit
    </ButtonStyled>
  );
};

export default BoardPreviewEditButton;
