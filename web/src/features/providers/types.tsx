export interface ProviderState {
  data: ProviderDto[];
  find: (filter?: string) => Promise<ProviderDto[]>;
  create: (dto: Omit<ProviderDto, "id">) => Promise<ProviderDto>
  delete: (id: number) => Promise<void>
}

export interface ProviderDto {
  id: number;
  name: string;
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  searchIndex: number;
}