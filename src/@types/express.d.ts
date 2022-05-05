
declare namespace Express {
  export interface Request {
    user: {
      auth_time: number;
      user_id: string | any;
      email: string;
      email_verified: boolean;
      iat: number;
      exp: number;
    }
  }
}