import axios from "axios";
import consts from "../constants/consts";

async function getUser() {
  const userData = JSON.parse(
    localStorage.getItem("sb-tutaydcbsuglspuywosf-auth-token")
  );

  const response = axios.get(consts.BASE_URL + "/user", {
    headers: {
      Cookie: `token=${userData?.access_token}`,
    },
  });

  return response;
}

export default getUser;
