export interface CustomerState {
  data: CustomerDto[];
  find: (filter?: string) => Promise<CustomerDto[]>;
  create: (dto: Omit<CustomerDto, "id">) => Promise<CustomerDto>
  delete: (id: number) => Promise<void>
}

export interface CustomerDto {
  id: number;
  email: string;
  name: string;
}