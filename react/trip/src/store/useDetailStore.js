import {
    create
} from 'zustand';
import { getDetail } from '@/api/detail'

const useDetailStore = create((set) => ({
    detail: {
        title: '',
        desc: '',
        images: [
            {
                alt: '',
                url: 'https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg'
            }
        ],
        price: ''
    },
    loading: false,
    setDetail: async (id) => {
        set({
            loading: true
        })
        try {
            const res = await getDetail(id);
            set({
                loading: false,
                detail: res.data
            });
        } catch (error) {
            console.error('Failed to fetch detail:', error);
            set({
                loading: false
            });
        }
    }
}))

export default useDetailStore