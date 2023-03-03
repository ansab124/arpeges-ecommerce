import axios from "axios";



const instance = axios.create({
  baseURL: "https://boarpeges.netservex.com/api/v1/",
  headers: {
    'Content-Type': "application/json",
    timeout: 1000,
    "x-locale": 'fr',
    // "X-CSRF-TOKEN": "zgKzt00I0ohdddrQmkNjuieDEKCX3r57q4Av8MPZx4k"
  }, withCredentials: false
});

if (typeof window != "undefined") {
  let token = localStorage.getItem("token");
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


export default instance;