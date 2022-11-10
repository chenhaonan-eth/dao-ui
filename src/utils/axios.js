/**
 * 网络请求配置
 */
import axios from 'axios';
import config from 'config';

axios.defaults.timeout = 100000;
axios.defaults.baseURL = `${config.url_base}`;

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json'
        };
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('请求出错：', error);
        // 异常的请求返回处理
        const data = {};
        throw data;
    }
);

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
    console.log(url, params, data);
}

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params
            })
            .then((response) => {
                landing(url, params, response?.data);
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            (response) => {
                // 关闭进度条
                resolve(response?.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

// 统一接口处理，返回数据
export default (fecth, url, param) =>
    new Promise((resolve, reject) => {
        switch (fecth) {
            case 'get':
                console.log('begin a get request,and url:', url);
                get(url, param)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log('get request GET failed.', error);
                        reject(error);
                    });
                break;
            case 'post':
                console.log('begin a post request,and url:', url, param);
                post(url, param)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log('get request POST failed.', error);
                        reject(error);
                    });
                break;
            default:
                break;
        }
    });
