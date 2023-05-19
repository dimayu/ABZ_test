import axios from 'axios';

axios.defaults.baseURL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getUsers = async (page) => {
  try {
    const response = await axios.get(`/users?page=${page}&count=6`);
    return response.data;
  } catch (error) {
    error(`Wrong getting users: ${error.message}`);
  }
};

export const getPositions = async () => {
  try {
    const response = await axios.get('/positions');
    return response.data;
  } catch (error) {
    error(`Wrong getting position: ${error.message}`);
  }
};

const getToken = async () => {
  try {
    const response = await axios.get('/token');
    return response.data.token;
  } catch (error) {
    (`Wrong get token: ${error.message}`);
    return error;
  }
};

export const addUser = async credentials => {
  try {
    const token = await getToken();
    const response = await axios.post(`/users`, credentials, {
      headers: {'Content-Type': 'multipart/form-data', token},
    });
    return response.data;
  } catch (error) {
    error(`Wrong adding user: ${error.message}`);
  }
};
