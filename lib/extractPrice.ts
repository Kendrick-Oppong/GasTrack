export const extractPrice = (value: string) => {
  const match = value.match(/\d+$/);
  return match ? parseInt(match[0], 10) : null;
};


export const extractText = (value:string) => {
  return value.replace(/-\s*\d+.*$/, "").trim();
};
