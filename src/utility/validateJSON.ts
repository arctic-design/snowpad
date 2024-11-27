export const validateJSON = (input: string): [boolean, any] => {
  try {
    const parsed = JSON.parse(input);
    return [true, parsed];
  } catch (err: any) {
    return [false, err?.message || ''];
  }
};
