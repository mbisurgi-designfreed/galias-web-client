export default class AuthService {
    public static isAuthed(): boolean {
        const jwt = localStorage.getItem('token');

        return Boolean(jwt);
    }
}