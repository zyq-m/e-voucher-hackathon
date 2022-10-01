import instanceAxios from "../instanceAxios";

export const getCafe = async () => {
  try {
    const response = await instanceAxios.get("/api/cafe")
    return response.data
  } catch (error) {
    console.log(error)
  }
};
