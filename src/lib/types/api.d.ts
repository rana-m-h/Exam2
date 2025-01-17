declare type DatabaseFields = {
  _id: string;
  createdAt: string;

};

declare type SuccessfulResponse<T> = {
  message: "success";
}& T;


declare type ErrorResponse = {
  message: string;
  code: number;

};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

declare type Metadata = {
  "currentPage": number;
  "numberOfPages": number 
  "limit": number;
  
};

declare type PaginatedResponse<T> = {
  [key: string]: T;
  metadata: Metadata;

};
