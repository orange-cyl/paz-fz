/**
	axios的配置文件
	1、设置post数据格式为表单格式
	2、设置基路径
	3、序列化字符串
*/
import axios from 'axios';
import qs from 'qs';
import conf from '../config'
//配置
//配置前后端数据交互的请求头：
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 设置后台的访问地址
// axios.defaults.baseURL = 'http://192.168.8.101:8888';
axios.defaults.baseURL = conf.bp;
/* axios.defaults.baseURL = 'http://192.168.1.5:8888'; */
/* axios.defaults.baseURL = 'http://192.168.8.101:8888'; */

axios.interceptors.request.use((config) => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data,{arrayFormat: 'repeat' });
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});

export default axios;