import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import { useState, useEffect } from 'react';

const LabelsPin = () => {
  const { categoriesPin, pinData, t } = useAppsStore();

  const [categoriesSelect, setCategoriesSelect] = useState(categoriesPin);

  useEffect(() => {
    if (pinData?.topics && categoriesPin.length) {
      const selectedCategories = categoriesPin.filter((category) =>
        pinData.topics?.includes(category.id)
      );

      setCategoriesSelect(selectedCategories);
    }
  }, [categoriesPin]);

  return (
    <div className='flex flex-wrap flex-row gap-1'>
      {categoriesSelect.map((elem) => (
        <span
          key={elem.id}
          className='text-sm text-blue-600 underline cursor-pointer'
        >
          #{t?.categories[`${elem.name}`] || elem.name}
        </span>
      ))}
    </div>
  );
};

export default LabelsPin;
