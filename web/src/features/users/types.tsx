export interface UserState {
  data: UserDto[];
  find: (filter?: string) => Promise<UserDto[]>;
  create: (dto: Omit<UserDto, "id"> & PasswordDto) => Promise<UserDto>
  delete: (id: number) => Promise<void>
}

export interface UserDto {
  id: number;
  email: string;
  name: string;
  username: string;
}

export interface PasswordDto {
  password: string;
}