import instanceAxios from "../lib/instanceAxios";
import { useState, useEffect } from "react";

export const useStudent = ({ id, student, refresh }) => {
  const [students, setStudents] = useState([])

  const getStudentById = async () => {
    try {
      let response

      if (id) {
        response = await instanceAxios.get(`/api/students/${id}`)
      } else {
        response = await instanceAxios.get('/api/students')
      }

      setStudents(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    student && getStudentById()
  }, [])

  useEffect(() => {
    student && refresh && getStudentById()
  }, [refresh])

  return { students }
};
