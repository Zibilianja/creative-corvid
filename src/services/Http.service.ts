// import axios, {
//   AxiosError,
//   type AxiosInstance,
//   type AxiosRequestConfig,
//   type AxiosResponse,
// } from 'axios';
// import { HTTP_ERROR, HTTP_METHOD } from '../constants';

// class HttpService {
//   private instance: AxiosInstance | null = null;

//   private get http(): AxiosInstance {
//     return this.instance !== null ? this.instance : this.initHttp();
//   }

//   initHttp(): AxiosInstance {
//     const http = axios.create({
//       baseURL: `${PORTAL_URL}/o/web-services/datalist/v2/vuedatatable`,
//       headers: {
//         Accept: '*/*',
//         'Content-type': 'application/json; charset=UTF-8;',
//         'User-Id': USER_ID,
//         'Group-Id': GROUP_ID,
//         'Company-Id': COMPANY_ID,
//       },
//       timeout: 30000,
//     });

//     http.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         return Promise.reject(this._handleError(error));
//       }
//     );

//     this.instance = http;
//     return http;
//   }

//   [HTTP_METHOD.GET] = <T = never, R = AxiosResponse<T>>(
//     url: string,
//     config?: AxiosRequestConfig
//   ): Promise<R> => {
//     return this.http.get<T, R>(url, config);
//   };

//   [HTTP_METHOD.POST] = <T = never, R = AxiosResponse<T>>(
//     url: string,
//     data: unknown,
//     config?: AxiosRequestConfig
//   ): Promise<R> => {
//     return this.http.post<T, R>(url, data, config);
//   };

//   [HTTP_METHOD.PUT] = <T = never, R = AxiosResponse<T>>(
//     url: string,
//     data: unknown,
//     config?: AxiosRequestConfig
//   ): Promise<R> => {
//     return this.http.put<T, R>(url, data, config);
//   };

//   [HTTP_METHOD.DELETE] = <T = never, R = AxiosResponse<T>>(
//     url: string,
//     config?: AxiosRequestConfig
//   ): Promise<R> => {
//     return this.http.delete<T, R>(url, config);
//   };

//   [HTTP_METHOD.PATCH] = <T = never, R = AxiosResponse<T>>(
//     url: string,
//     data: unknown,
//     config?: AxiosRequestConfig
//   ): Promise<R> => {
//     return this.http.patch<T, R>(url, data, config);
//   };

//   [HTTP_METHOD.OPTIONS] = <T = never, R = AxiosResponse<T>>(
//     url: string,
//     config?: AxiosRequestConfig
//   ): Promise<R> => {
//     return this.http.options<T, R>(url, config);
//   };

//   private readonly _handleError = (error: AxiosError): string => {
//     const code = 'code' in error ? error.code : '';
//     const RESPONSE = {
//       error: this._getHttpError(error.response?.status),
//     };

//     if (axios.isCancel(error) || code === 'ECONNABORTED') {
//       RESPONSE.error = 'Request Timeout';
//     }
//     return RESPONSE.error;
//   };

//   private readonly _getHttpError = (status: number | undefined): string => {
//     if (status === undefined) {
//       return 'Network Error';
//     }
//     if (status in HTTP_ERROR) {
//       return HTTP_ERROR[status];
//     }
//     return 'Unknown Error';
//   };
// }

// export const http = new HttpService();
