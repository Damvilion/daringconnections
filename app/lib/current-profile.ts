import { FirebaseAuth } from '@/app/firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

export const current_profile = () => {
    return new Promise((resolve) => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (user) {
                const response = await axios.post('/api/auth/getCurrentUser', { uid: user.uid });
                resolve(response.data.profile);
            } else {
                resolve(null);
            }
        });
    });
};
