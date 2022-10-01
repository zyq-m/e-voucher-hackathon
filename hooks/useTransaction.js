import { useState, useEffect } from "react";
import instanceAxios from "../lib/instanceAxios";

export const useTransaction = ({ id, student, refresh }) => {
  const [transactions, setTransactions] = useState()

  const getTransactionById = async () => {
    try {
      const response = await instanceAxios.get(`/api/transactions/${student ? `students` : `cafe`}/${id}`)
      setTransactions(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTransactionById()
  }, [])

  useEffect(() => {
    refresh && getTransactionById()
  }, [refresh])

  return { transactions, setTransactions }
};
