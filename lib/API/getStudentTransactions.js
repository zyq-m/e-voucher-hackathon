import instanceAxios from "../instanceAxios";

export const getStudentTransactions = async (token, id) => {
  const response = await instanceAxios
    .get(`/api/transactions/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => res.data)
    .catch(() => false);
  return response;
};
