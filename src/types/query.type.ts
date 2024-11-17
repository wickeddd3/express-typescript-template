export type Order = "asc" | "desc";

export type ListQueryParams = {
  take: number;
  skip: number;
  orderBy: string;
  order: Order;
};
