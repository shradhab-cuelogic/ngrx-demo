export interface AuthResponse {
    email: string;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}