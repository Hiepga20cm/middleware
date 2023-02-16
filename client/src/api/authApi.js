import axiosClient from "./index.js";

const authApi = {
  login: async (data) => {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
  logout: async () => {
    localStorage.clear();
    window.location.reload();
    alert("đăng xuất thành công");
  },
  register: async (data) => {
    const url = "/auth/register";
    return axiosClient.post(url, data);
  },
  success: async () => {
    const url = "/auth/success";
    return axiosClient.get(url);
  },
};

export default authApi;
