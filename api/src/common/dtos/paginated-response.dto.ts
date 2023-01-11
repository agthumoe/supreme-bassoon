export default interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current: number;
    total: number;
    pageSize: number;
  };
}
