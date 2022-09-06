import instanceAxios from "../instanceAxios";
import { save } from "../../utils/SecureStore";

export const loginStudent = async data => {
  const response = instanceAxios
    .post("/students/login", data)
    .then(res => {
      const token = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      };

      save("accessToken", token.accessToken);
      save("refreshToken", token.refreshToken);
      return res.data;
    })
    .catch(() => false);

  return response;
};
