import instanceAxios from "../instanceAxios";

export const getCafe = async token => {
  const response = await instanceAxios
    .get("/api/cafe", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => res.data)
    .catch(() => false);
  return response;
};
