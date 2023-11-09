import fetcher from '@/utils/fetcher';


export const fetchLogin = (data: Object) => fetcher.post('/login/', data);

