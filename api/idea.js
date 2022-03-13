import axios from '@/utils/axios'

export const list = async (params = {}) => {
  return await axios.get('idea/my-idea', { params })
}

export const getAll = async (params = {}) => {
  return await axios.get('idea', { params })
}

export const add = async (params = {}) => {
  return await axios.post('idea', params)
}

export const upload = async (params = {}) => {
  return await axios.post('upload', params)
}

export const update = async (params = {}) => {
  return await axios.put(`idea/${params.id}`, params)
}

export const getListCategory = async (params = {}) => {
  return await axios.get('category')
}

export const details = async (id) => {
  return await axios.get(`idea/${id}`)
}

export const destroy = async (id) => {
  return await axios.delete(`idea/${id}`)
}

export const addComment = async (params = {}) => {
  return await axios.post('idea/comment', params)
}

export const getListComment = async (id) => {
  return await axios.get(`idea/${id}/comment`)
}
export const getUserLikeIdea = async (id) => {
  return await axios.get(`idea/${id}/like`)
}

export const likeIdea = async (id) => {
  return await axios.post(`idea/${id}/like`)
}

export const returnLikeIdea = async (id) => {
  return await axios.delete(`idea/${id}/like`)
}

export const getUserDisLikeIdea = async (id) => {
  return await axios.get(`idea/${id}/dislike`)
}

export const disLikeIdea = async (id) => {
  return await axios.post(`idea/${id}/dislike`)
}

export const returnDislikeIdea = async (id) => {
  return await axios.delete(`idea/${id}/dislike`)
}
