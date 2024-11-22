const API_URL = "http://localhost:3006";

export const getCatalogItem = async (id) => {
  const response = await fetch(`${API_URL}/item/${id}`);
  const { content } = await response.json();
  return content;
};

export const getCatalogItems = async () => {
  const response = await fetch(`${API_URL}/item`);
  const { content } = await response.json();
  return content;
};

export const getItemPhoto = async (path) => {
  const response = await fetch(`${API_URL}/${path}`);
  const blob = await response.blob();
  const newBlob = new Blob([blob]);
  return window.URL.createObjectURL(newBlob);
};
