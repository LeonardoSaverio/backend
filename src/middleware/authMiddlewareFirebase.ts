import admin from '../config/firebase-config';
import { Request, Response, NextFunction } from 'express';
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

interface TokenPayload {
    id: string;
    name: string;
    email: string;
    iat: number;
    exp: number;
  }
  
  
class AuthMiddleware {
	async decodeToken(request: Request, response: Response, next: NextFunction) {
		const token = request.headers?.authorization?.split(' ')[1];
		if (!token) {
			return response.json({ message: 'unauthorized' })
		}

		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
                //issue fix type for decode token and remove ts-ignore 
                //@ts-ignore
				request.user = decodeValue as TokenPayload;
				return next();
			}
			return response.json({ message: 'unauthorized' });
		} catch (e) {
			return response.json({ message: `Internal Error: ${e}` });
		}
	}
}

export default new AuthMiddleware();
