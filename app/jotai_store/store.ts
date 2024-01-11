import { atom, useAtom } from 'jotai';

import { Profile } from '@/app/lib/types/types';

const current_user = atom<null | Profile>(null);
const loadingUser = atom<boolean>(true);

export const jotai = {
    useAtom,
};

export { current_user, loadingUser };
