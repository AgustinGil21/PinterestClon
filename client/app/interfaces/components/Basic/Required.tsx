import { useAppsStore } from '../../../infrastructure/stores/useAppStore';

interface Props {
  textSize?: string;
  className?: string;
}

export const Required = ({ textSize, className }: Props) => {
  const { t } = useAppsStore();

  return (
    <span
      className={`text-[#e60023] font-bold ${
        textSize ? textSize : 'text-[0.6rem]'
      } ${className}`}
      title={t?.required || 'Obligatorio'}
    >
      *
    </span>
  );
};
