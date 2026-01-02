import axiosBase from "./axiosBase";


export const index = async (route = '/') => {
    try{
        const response = await axiosBase.get(route);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const store = async (route = '/', data) => {
    try{
        const response = await axiosBase.post(route, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const show = async (route = '/', id, data) => {
    try{
        const response = await axiosBase.get(router.id, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const update = async (route = '/', id, data) => {
    try{
        const response = await axiosBase.put(`${route}/${id}/`, data);
        return response;
    }
    catch(error){
        throw error;
    }
} 

export const remove = async (route = '/', id) => {
    try{
        const response = await axiosBase.delete(`${route}/${id}/`);
        return response;
    }
    catch(error){
        throw error;
    }
} 
