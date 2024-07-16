import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // 쿠키를 포함한 요청을 보냅니다
});

// CSRF 토큰 가져오기
const getCsrfToken = () => {
  const csrfToken = Cookies.get('csrftoken');
  return csrfToken;
}

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token');
    const csrfToken = getCsrfToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get('refresh_token');
    
    // Access 토큰이 만료된 경우
    if (error.response.status === 401 && refreshToken) {
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/refresh/`, {
          refresh: refreshToken,
        });
        Cookies.set('access_token', data.access, { httpOnly: true, secure: true });
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return axios(originalRequest);
      } catch (err) {
        console.error('토큰 갱신 실패:', err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
