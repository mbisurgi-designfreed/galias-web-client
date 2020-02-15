import BaseService from './baseService';

import { User } from '../types';

export interface AuthResponse {
    status: string;
    user?: User;
    token?: string;
    error: string;
}

interface AuthParams {
    username: string;
    password: string;
}

export default class AuthService extends BaseService {
    static loginRoute = SERVICES.LOGIN;
    static signupRoute = SERVICES.SIGNUP;

    private static createAuthParams(username: string, password: string): AuthParams {
        return {
            username: username.trim(),
            password: password.trim()
        };
    }

    private static storeAuthToken(token: string): void {
        localStorage.setItem(SERVICES.__JWT_SECRET__, token);
    }

    public static async signup(
        username: string,
        password: string,
        org_id: number,
        region_id: number
    ): Promise<AuthResponse> {
        try {
            let authParams = this.createAuthParams(username, password);
            authParams['organization_id'] = org_id;
            authParams['region_id'] = region_id;
            const signupResponse = await this.postFormRequest<AuthResponse>(this.signupRoute, authParams);

            if (signupResponse.status === 'success') {
                this.storeAuthToken(signupResponse.token);
            }

            return signupResponse;
        } catch (e) {
            console.error(e);

            return {
                status: 'error',
                error: 'An error occured while signing up.'
            };
        }
    }

    public static async login(username: string, password: string): Promise<AuthResponse> {
        try {
            const loginResponse = await this.postFormRequest<AuthResponse>(
                this.loginRoute,
                this.createAuthParams(username, password)
            );

            if (loginResponse.status === 'success') {
                this.storeAuthToken(loginResponse.token);
            }

            return loginResponse;
        } catch (e) {
            console.error(e);

            return {
                status: 'error',
                error: 'An error occured while logging in.'
            };
        }
    }

    public static async logout(): Promise<boolean> {
        localStorage.clear();
        return true;
    }

    public static isAuthed(): boolean {
        const jwt = localStorage.getItem(SERVICES.__JWT_SECRET__);

        return Boolean(jwt);
    }
}
