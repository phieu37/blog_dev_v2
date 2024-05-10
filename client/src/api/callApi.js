import axios from "axios";  // để call api
import {isFunction} from 'lodash';  // để kiểm tra biến là hàm hay không
import { getAuthToken } from "../utils/localStorage"; // để lấy token

// nhận đối tượng chứa các tham số được truyền vào
export default async function callApi ({
  method,
  apiPath,
  actionTypes: [requestType, successType, failureType],
  variables,
  dispatch,
  getState,
  headers
}) {
  // kiểm tra dispatch và getState có phải là hàm không
  if (!isFunction(dispatch) || !isFunction(getState)) {
    throw new Error('callGraphQLApi requires dispatch and getState functions');
  }
  
  const baseUrlApi = import.meta.env.VITE_API_URL;  // lấy Url của API từ biến môi trường VITE_API_URL 
  const token = getAuthToken(); // lấy token xác thực từ localStorage

  // tạo header cho req HTTP: chỉ định Content-Type và thêm token vào trường Authorization
  const header = {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };

  // gửi action thông báo bắt đầu request: gọi action requestType được truyền vào
  dispatch(requestType())

  // sử dụng axios gọi API. Nó cài đặt các cấu hình: baseURL, headers, method, 
  // url, data, params tương ứng với các tham số được truyền vào
  // Sau đó xử lý kết quả thành công và thất bại
  return axios({
    baseURL: baseUrlApi,
    headers: headers ? {...header, ...headers} : header,
    method: method,
    url: apiPath,
    data: variables,
    params: method === 'get' ? variables : ''
  })
  .then(function (response) {
    dispatch(successType(response.data))
    return response.data;
  })
  .catch((error) => {
    let response = error.response ? error.response : error;
    dispatch(failureType(error.response));
    return response
  })
}

