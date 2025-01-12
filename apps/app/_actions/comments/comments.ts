import axios, { AxiosInstance } from "axios";
export const createApiRequester : AxiosInstance = axios.create({
    baseURL: `http://localhost:3001/comments`,
});


export const getCommentById = (postId: number) => createApiRequester.get(`/`, {
    params: { postId }
  });
export const deleteCommentById = (postId: number) => createApiRequester.delete(`/`, {
    params: { postId }
  });
export const createComment = (data: any) => createApiRequester.post('/', data);
export const updateComment = (id: number, data: any) => createApiRequester.put(`/${id}`, data);
export const deleteComment = (id: number) => createApiRequester.delete(`/${id}`);