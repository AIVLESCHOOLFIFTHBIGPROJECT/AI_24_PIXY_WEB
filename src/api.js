import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,  // 쿠키를 포함한 요청을 보냅니다
});

const logout = () => {
  sessionStorage.removeItem('accessToken');
 };

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    // CSRF 토큰 추가
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//응답 인터셉터 설정 (토큰 갱신 로직 포함)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/api/token/refresh/`, {
          refresh: refreshToken,
        }, { withCredentials: true });

        sessionStorage.setItem('access_token', data.access, { secure: true });
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return axios(originalRequest);
      } catch (err) {
        console.error('토큰 갱신 실패:', err);
        // 로그아웃 로직 추가 (옵션)
        logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
