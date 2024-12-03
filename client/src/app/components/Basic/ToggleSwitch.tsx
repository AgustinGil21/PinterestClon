import { Ref } from 'react';
import { Switch } from '@headlessui/react';

interface Props {
  onChangeWithArg?: (checked: boolean) => void;
  onChange?: () => void;
  checked?: boolean;
  label?: string;
  switchClassName?: string;
  labelClassName?: string;
  circleClassName?: string;
  switchRef?: Ref<HTMLButtonElement>;
  colorStyle?: 'pinterest' | 'default' | 'gray' | 'none';
}

const ToggleSwitch = ({
  onChangeWithArg,
  onChange,
  checked,
  label,
  switchClassName,
  labelClassName,
  circleClassName,
  colorStyle,
  switchRef,
}: Props) => {
  const switchStyles = {
    pinterest: 'data-[checked]:border-[#e60023] data-[checked]:bg-[#e60023]',
    default: 'data-[checked]:border-black data-[checked]:bg-black',
    gray: 'data-[checked]:border-[#cdcdcd] data-[checked]:bg-[#cdcdcd]',
    none: '',
  };

  return (
    <label className={labelClassName}>
      {label && <span>{label}</span>}
      <Switch
        checked={checked}
        onChange={onChangeWithArg || onChange}
        className={`group inline-flex h-6 w-11 items-center rounded-full transition bg-white  border-solid border border-[#949494] ${
          colorStyle ? switchStyles[colorStyle] : switchStyles.default
        } ${switchClassName}`}
        ref={switchRef}
      >
        <span
          className={`size-6 translate-x-[-2px] rounded-full bg-white transition group-data-[checked]:translate-x-5 border-solid border border-[#949494] ${circleClassName}`}
        />
      </Switch>
    </label>
  );
};

export default ToggleSwitch;
