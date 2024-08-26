import { Switch } from '@headlessui/react';

const PrivacyOrPublicSwitch = () => {
  return (
    <div className='flex items-center '>
      <div>
        {' '}
        <span className='font-semibold'>Perfil privado</span>
        <p className='text-[13px]'>
          Cuando tu perfil es privado, solo las personas que apruebes podrán ver
          tu perfil, Pines, tableros, seguidores y listas de seguidos. Obtén más
          información.
        </p>
      </div>
      <div>
        <Switch className='group inline-flex h-5 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-black'>
          <span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
        </Switch>
      </div>
    </div>
  );
};

export default PrivacyOrPublicSwitch;
