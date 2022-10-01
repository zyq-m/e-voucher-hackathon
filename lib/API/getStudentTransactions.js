import instanceAxios from "../instanceAxios";

export const getStudentTransactions = async (id) => {
  const response = await instanceAxios
    .get(`/api/transactions/students/${id}`)
    .then(res => res.data)
  return response;
};
