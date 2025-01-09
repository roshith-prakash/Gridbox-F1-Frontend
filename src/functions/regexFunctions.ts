// Check if Text editor is empty.
export const isEditorEmpty = (value: string | undefined | null) => {
  return value === undefined || value === null
    ? false
    : String(value)
        .replace(/<(.|\n)*?>/g, "")
        .trim().length === 0;
};
