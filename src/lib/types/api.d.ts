declare type DatabaseFields = {
  _id: string;
  createdAt: string;
  isVerified: boolean; 
  passwordResetCode: string; 
  passwordResetExpires: string;
  resetCodeVerified: boolean; 

};

declare type SuccessfulResponse<T> = {
  message: "success";
  statusCode: number;
  // data: T;
};

declare type ValidationError = {
  field: string;
  errorMessage: string;
};

declare type ErrorResponse = {
  message: "error" | "fail";
  statusCode: number;
  message: string | ValidationError[];
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

declare type Metadata = {
  total: number;
  count: number;
  pages: number | null;
  limit: number;
  page: number;
};

declare type PaginatedResponse<T> = {
  [key: string]: T;
  pagination: Metadata;
};
