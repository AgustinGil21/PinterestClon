import { Switch } from '@headlessui/react';
import { useState } from 'react';

const SwitchMode = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className='group inline-flex h-5 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-black'
    >
      <span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
    </Switch>
  );
};

export default SwitchMode;
