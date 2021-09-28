import { verifyUserSessionToken } from './firebase';

export interface Context {
  req: any;
}

export interface Auth {
  id: string;
  [key: string]: any;
}

export async function getUser(ctx: Context) {
  const authorization = ctx.req.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const user = await verifyUserSessionToken(token);
    return user;
  }
  return null;
}

export class AuthError extends Error {
  constructor(error: { message: string; stack?: any } = { message: 'Not authorized' }) {
    super(error.message);
  }
}
