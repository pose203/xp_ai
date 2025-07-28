import axios from '@/api/config'

export const getSuggestList = async(keyword) => {
    return axios.get(`/search?keyword=${keyword}`);
}

export const getHotList = async() => {
    return axios.get('/hotList');
}
