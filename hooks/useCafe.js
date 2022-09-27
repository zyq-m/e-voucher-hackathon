import instanceAxios from "../lib/instanceAxios";
import { useState, useEffect } from "react";

export const useCafe = ({ id, student }) => {
  const [cafe, setCafe] = useState([])

  const getCafeById = async () => {
    try {
      let response

      if (id) {
        response = await instanceAxios.get(`/api/cafe/${id}`)
      } else {
        response = await instanceAxios.get('/api/cafe')
      }

      setCafe(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    !student && getCafeById()
  }, [])

  return { cafe }
};
