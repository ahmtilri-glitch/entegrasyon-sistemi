export interface PagedResponse<T> {
  totalElements?: number;
  totalPages?: number;
  page?: number;
  size?: number;
  content: T[];
}

export interface BatchRequestResponse {
  batchRequestId: string;
}

export interface BatchRequestResultItem {
  requestItem?: Record<string, unknown>;
  status?: string;
  failureReasons?: string[];
}

export interface BatchRequestResult {
  supplierId?: number;
  batchRequestId: string;
  items?: BatchRequestResultItem[];
  status?: string;
  creationDate?: number;
  lastModification?: number;
  sourceType?: string;
  itemCount?: number;
  failedItemCount?: number;
  batchRequestType?: string;
}

export interface WorkingHour {
  dayOfWeek:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';
  openingTime: string;
  closingTime: string;
}

export type WorkingStatus = 'OPEN' | 'CLOSED';
export type ProductStatus = 'ACTIVE' | 'PASSIVE';
