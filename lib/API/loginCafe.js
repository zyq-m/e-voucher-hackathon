import instanceAxios from "../instanceAxios";
import { save } from "../../utils/SecureStore";

export const loginCafe = async data => {
  try {
    const response = await instanceAxios.post("/cafe/login", data);

    save("accessToken", response.data.accessToken);
    save("refreshToken", response.data.refreshToken);
    save("login", JSON.stringify(true));

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
