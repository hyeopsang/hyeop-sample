import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { CreatePostDTO, UpdatePostDTO, CreateCommentDTO } from "../types/index";
const BASE_URL = "http://localhost:3000/api";
const postApi = axios.create({
  baseURL: BASE_URL,
});

const apiRequest = (
  method: string,
  url: string,
  options: AxiosRequestConfig = {},
) => {
  return postApi.request({
    method,
    url,
    ...options,
  });
};

export const getPostById = (id: string, options?: AxiosRequestConfig) =>
  apiRequest("GET", `/posts/${id}`, options);

export const getPosts = (page?: number, limit?: number) =>
  apiRequest("GET", "/posts/paginated", {
    params: {
      page,
      limit,
    },
  });

export const createPost = (data: CreatePostDTO, options?: AxiosRequestConfig) =>
  apiRequest("POST", "/posts", {
    data,
    ...options,
  });

export const updatePost = (
  id: string,
  data: UpdatePostDTO,
  options?: AxiosRequestConfig,
) =>
  apiRequest("PUT", `/posts/${id}`, {
    data,
    ...options,
  });

export const deletePost = (id: string, options?: AxiosRequestConfig) =>
  apiRequest("DELETE", `/posts/${id}`, options);

export const getComment = (id: string, options?: AxiosRequestConfig) =>
  apiRequest("GET", `/posts/${id}/comments`, options);

export const createComment = (
  id: string,
  data: CreateCommentDTO,
  options?: AxiosRequestConfig,
) =>
  apiRequest("POST", `/posts/${id}/comments`, {
    data,
    ...options,
  });
export const deleteComment = (id: string, options?: AxiosRequestConfig) =>
  apiRequest("DELETE", `/posts/${id}/comments`, options);
