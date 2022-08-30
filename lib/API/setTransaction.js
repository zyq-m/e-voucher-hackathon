import instanceAxios from "../instanceAxios";

export const setTransactions = async (id, token, data) => {
  const response = await instanceAxios
    .post(`/api/transactions/cafe/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => res.data)
    .catch(() => false);
  return response;
};
