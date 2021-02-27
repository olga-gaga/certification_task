function returnData(response) {
  return response.data;
}

export default (axios) => {
  axios.interceptors.response.use(returnData);
};
