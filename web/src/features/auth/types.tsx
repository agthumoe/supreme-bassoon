export interface AuthState {
  data: AuthData;
  login: (dto: LoginDto) => Promise<AuthData>;
  logout: () => void
}

export interface AuthData {
  accessToken?: string;
  refreshToken?: string;
}

export interface LoginDto {
  username: string;
  password: string;
}