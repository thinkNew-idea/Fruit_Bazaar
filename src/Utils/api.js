import axios from "axios";
import { BaseUrl } from "./common";
// verify email api start
export const ApiCall = async (type, endUrl, requestData) => {
  let header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  if (token) {
    header["Authorization"] = `Bearer ${token}`;
  }
  let config = {
    method: type,
    maxBodyLength: Infinity,
    url: BaseUrl + endUrl,
    headers: header,
    data: JSON.stringify(requestData),
  };

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
// verify email api end

// login api start
export const Loginapicall = async (type, endUrl, requestData) => {
  let header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  if (token) {
    header["Authorization"] = `Bearer ${token}`;
  }
  let config = {
    method: type,
    maxBodyLength: Infinity,
    url: BaseUrl + endUrl,
    headers: header,
    data: JSON.stringify(requestData),
  };

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
// login api end


