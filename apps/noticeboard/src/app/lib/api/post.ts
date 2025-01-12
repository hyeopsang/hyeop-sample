import axios, { AxiosInstance } from "axios";

export const apiRequester: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001/posts',
});


export const getPosts = () => apiRequester.get('/');
export const getPostById = (id: number) => apiRequester.get(`/${id}`);
export const createPost = (data: any) => apiRequester.post('/', data);
export const updatePost = (id: number, data: any) => apiRequester.put(`/${id}`, data);
export const deletePost = (id: number) => apiRequester.delete(`/${id}`);