import { atom, useAtom } from 'jotai';

import { Profile } from '@/app/lib/types/types';

const current_user = atom<null | Profile>(null);
const loadingUser = atom<boolean>(true);

const liveKitConnection = atom<boolean>(true);
const liveKitRoom = atom<string>('');
const liveKitDataToken = atom<string>('');

const microphoneConnection = atom<boolean>(false);

export const jotai = {
    useAtom,
};

export { current_user, loadingUser, liveKitConnection, microphoneConnection, liveKitRoom, liveKitDataToken };
