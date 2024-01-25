import { FirebaseAuth } from '@/firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import axios, { AxiosResponse } from 'axios';
import { Profile } from './types/types';

export const current_profile = () => {
    type axiosData = { message: string; profile: Profile };
    interface axiosResponses extends AxiosResponse {
        data: axiosData;
    }
    return new Promise((resolve) => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (user) {
                const response: axiosResponses = await axios.post('/api/auth/getCurrentUser', { id: user.uid });

                resolve(response.data.profile);
            } else {
                resolve(null);
            }
        });
    });
};
