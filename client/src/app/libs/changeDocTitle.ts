export const changeDocTitle = (title: string) => {
  if (typeof title !== 'string') return;

  document.title = title;
};
