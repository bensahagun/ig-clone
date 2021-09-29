import { verifyUserSessionToken } from './firebase';

export interface Context {
  req: any;
  user: Auth;
}

export interface Auth {
  uid: string;
  [key: string]: any;
}

export async function getUser(ctx) {
  const authorization = (ctx.req || ctx.request).get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const user = (await verifyUserSessionToken(token)) as Auth;
    return user;
  }
  return null;
}

export class AuthError extends Error {
  constructor(error: { message: string; stack?: any } = { message: 'Not authorized' }) {
    super(error.message);
  }
}
