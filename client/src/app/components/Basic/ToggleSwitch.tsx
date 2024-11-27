'use client';

import { Switch } from '@headlessui/react';

interface Props {
  onChange?: () => void;
  checked?: boolean;
  label?: string;
  switchClassName?: string;
  labelClassName?: string;
  circleClassName?: string;
}

const ToggleSwitch = ({
  onChange,
  checked,
  label,
  switchClassName,
  labelClassName,
  circleClassName,
}: Props) => {
  return (
    <label className={labelClassName}>
      {label && <span>{label}</span>}
      <Switch
        checked={checked}
        onChange={onChange}
        className={`group inline-flex h-6 w-11 items-center rounded-full transition bg-white data-[checked]:bg-black border-solid border border-[#949494] data-[checked]:border-black ${switchClassName}`}
      >
        <span
          className={`size-6 translate-x-[-2px] rounded-full bg-white transition group-data-[checked]:translate-x-5 border-solid border border-[#949494] ${circleClassName}`}
        />
      </Switch>
    </label>
  );
};

export default ToggleSwitch;
