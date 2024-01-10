import { FirebaseAuth } from '@/app/firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import axios, { AxiosResponse } from 'axios';

export const current_profile = () => {
    type Profile = {
        id: string;
        username: string;
        dareCoins: number;
        email?: string;
    };
    type axiosData = { message: string; profile: Profile };
    interface axiosResponses extends AxiosResponse {
        data: axiosData;
    }
    return new Promise((resolve) => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (user) {
                const response: axiosResponses = await axios.post('/api/auth/getCurrentUser', { uid: user.uid });
                resolve(response.data.profile);
            } else {
                resolve(null);
            }
        });
    });
};
