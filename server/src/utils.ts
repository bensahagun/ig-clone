import { ExpressContext } from 'apollo-server-express';
import { verifyUserSessionToken } from './firebase';

export interface Context {
  req: any;
}

export interface Auth {
  id: string;
  [key: string]: any;
}

export async function getUser(ctx: Context) {
  const Authorization = ctx.req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { id, admin } = (await verifyUserSessionToken(token)) as Auth;
    return { id, admin };
  }
  return null;
}
