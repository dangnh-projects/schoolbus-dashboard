export const convertObjectToFormData = obj => {
  const formData = new FormData();
  Object.keys(obj).forEach(key => obj[key] && formData.append(key, obj[key]));
  return formData;
};
