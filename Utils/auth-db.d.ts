import { AuthenticationState } from '../Types';
export declare const useDBAuthState: () => Promise<{
    state: AuthenticationState;
    saveCreds: () => Promise<void>;
}>;
