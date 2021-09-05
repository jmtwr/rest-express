export interface LogInCredentials {
  email: string;
  password: string;
}

export interface VerifiedLogInCredentials extends LogInCredentials {
  iat: number;
  exp: number;
}

export interface UserTO {
  user_id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface PublicUserTO extends Omit<UserTO, "password"> {
}

export interface SignUpReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}