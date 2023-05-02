import { API_URL } from './config';

const getId = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};


export { getId };
