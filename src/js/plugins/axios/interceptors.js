function returnData(response) {
  return response.data;
}

export default function (axios) {
  axios.interceptors.response.use(returnData);
}
