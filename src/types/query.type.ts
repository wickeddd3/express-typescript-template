export type Order = 'asc' | 'desc';

export type ListQueryParams = {
  size: number;
  page: number;
  orderBy: string;
  order: string;
};
