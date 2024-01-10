import { atom, useAtom, Provider } from 'jotai';

import { Profile } from '../lib/types/types';

const userAtom = atom<null | Profile>(null);
const loadingUser = atom<boolean>(true);

export const jotai = {
    useAtom,
};

export { userAtom, loadingUser };
