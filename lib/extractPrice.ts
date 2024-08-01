export const extractPrice = (value:string) => {
  // Capture the number after the last hyphen
  const match = value.match(/-\s*(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
};



export const extractText = (value:string) => {
  const match = value.match(/^(.+?)\s+-\s*\d+$/);
  return match ? match[1].trim() : "";
};
