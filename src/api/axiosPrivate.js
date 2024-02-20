import axios from 'axios';

const BASE_URL = 'api/'



const authAxios = axios.create({
  baseURL: BASE_URL,
});


authAxios.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export { authAxios };


// const getToken = () => {
//     const token = localStorage.getItem('token')
//     if(token){
//       return token;
//     }
//     return null
//   }

//   const authToken = getToken()

// export const authAxios = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: `Bearer ${authToken}`
//     }
// })
