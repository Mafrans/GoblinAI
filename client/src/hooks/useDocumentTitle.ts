export const useDocumentTitle = (title: string) => {
  const { DEV } = import.meta.env;
  document.title = `${title} - GoblinAI ${DEV ? "(DEV)" : ""}`;
};
