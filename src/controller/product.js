import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/product' }
		: { baseURL: `${ADDRESS}/product` };

const instance = axios.create({
	...url,
	withCredentials: true,
});
const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const get_list = async (part, subPart, page) => {
	return await instance
		.get(`/list/${part}/${subPart}/?page=${page}`)
		.catch(errorMessage);
};

export const get_detail = async (product_id) => {
	return await instance.get(`/detail/${product_id}`).catch(errorMessage);
};

export const get_recommend_list = async () => {
	return await instance.get(`/recommend`).catch(errorMessage);
};
