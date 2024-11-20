import XCategoryCreateClose from '@/app/interfaces/components/icons/XCategoryCreateClose';

interface Category {
  name: string;
  color: string;
}

interface CategoryLabelsInterface {
  handleClickDeleteCategory: (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => void;
  categoriesSelect: Category[];
}

const CategoryLabels = ({
  handleClickDeleteCategory,
  categoriesSelect,
}: CategoryLabelsInterface) => {
  return (
    <>
      {categoriesSelect.length > 0 && (
        <div className='flex flex-row flex-wrap w-full gap-2 mt-1.5'>
          {categoriesSelect.map((elem) => (
            <div
              key={elem.name}
              className='text-[12px] bg-black text-white px-4 py-3 rounded-[26px] font-semibold flex flex-row items-center gap-3'
              style={{ backgroundColor: elem.color }}
            >
              <span> {elem.name}</span>
              <button onClick={(e) => handleClickDeleteCategory(e, elem.name)}>
                <XCategoryCreateClose />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryLabels;
