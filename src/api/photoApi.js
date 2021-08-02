import ajax from './index'

export const putPhoto = (data)=>ajax(undefined, data, 'POST');

export const getPhotoName = (params)=>ajax(undefined, params, "GET")

export const getPhotoURL=(params)=>ajax(undefined,params,"GET")

export const deleteAPI=(params)=>ajax(undefined,params,"DELETE")