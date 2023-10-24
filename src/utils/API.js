export const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  } else {
    const error = await res.text();
    return Promise.reject(error);
  }
};