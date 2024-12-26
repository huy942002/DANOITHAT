import axios from 'axios';

const config = {
    // baseUrl: process.env.REACT_APP_API_ENDPOINT,
    baseUrl: 'http://localhost:8080/api/',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
};
const token = window.localStorage.getItem('token');

const http = axios.create(config);

const httpGet = async (endpoint) => {
    if (token) {
        return await http
            .get(`${config.baseUrl}${endpoint}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )
            .then((res) =>
                handleResponse(res)
            )
            .catch((error) => {
                console.error(error);
                throw Error(error);
            });
    } else {
        return await http
            .get(`${config.baseUrl}${endpoint}`)
            .then((res) => handleResponse(res))
            .catch((error) => {
                console.error(error);
                throw Error(error);
            });
    }
};

const httpPost = async (endpoint, data) => {
    if (token) {
        return await http
            .post(`${config.baseUrl}${endpoint}`, data, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => handleResponse(res))
            .catch((error) => {
                console.error(error);
                throw Error(error);
            });
    } else {
        return await http
            .post(`${config.baseUrl}${endpoint}`, data)
            .then((res) => handleResponse(res))
            .catch((error) => {
                console.error(error);
                throw Error(error);
            });
    }
};

const httpPut = async (endpoint, data) => {
    if (token) {
        return await http
            .put(`${config.baseUrl}${endpoint}`, data, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => handleResponse(res))
            .catch((error) => {
                console.error(error);
                throw Error(error);
            });
    } else {
        return await http
            .put(`${config.baseUrl}${endpoint}`, data)
            .then((res) => handleResponse(res))
            .catch((error) => {
                console.error(error);
                throw Error(error);
            });
    }
};

const httpDelete = async (endpoint, id) => {
    return await http
        .delete(`${config.baseUrl}${endpoint}/${id}`)
        .then((res) => handleResponse(res))
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
};

const handleResponse = (response) => {
    // You can handle 400 errors as well.
    if (response.status === 200) {
        return response.data;
    } else {
        throw Error(response.data | 'error');
    }
};

const httpPosts = async (endpoint) => {
    return await http
        .post(`${config.baseUrl}${endpoint}`)
        .then((res) => handleResponse(res))
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
};

export default { httpGet, httpPost, httpPut, httpDelete, httpPosts };
