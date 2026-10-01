export interface Store {
  id: string;
  name: string;
  code: string;
  location: string;
  commune: string;
}

export interface StoreListParams {
  search?: string;
  commune?: string;
  page: number;
  pageSize: number;
}

export interface StoreListResponse {
  items: Store[];
  total: number;
  page: number;
  pageSize: number;
}