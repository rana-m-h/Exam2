declare type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  
} & DatabaseFields;

declare type LoginResponse = {
  token: string;
  user: User;
};

declare type RegisterFields = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  rePassword: string;
};
