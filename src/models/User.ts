export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface LogInCredentials {
  email: string;
  password: string;
}

export interface VerifiedLogInCredentials extends LogInCredentials {
  iat: number;
  exp: number;
}