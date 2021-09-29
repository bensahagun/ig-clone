import { verifyIdToken, getUserRecord, createUserSessionToken } from '../firebase';
import { AuthError, Context } from '../utils';

const resolvers = {
  Query: {
    users: (_, __, ctx: Context) => {
      return [{ uid: ctx.user.uid, email: ctx.user.email, phone: ctx.user.phone }];
    },
  },
  Mutation: {
    signUp: async (_, { idToken }, ctx: Context) => {
      try {
        const { uid } = await verifyIdToken(idToken);
        const firebaseUser = await getUserRecord(uid);
        const { email, displayName, phoneNumber } = firebaseUser;

        const user = { uid, displayName, email, phoneNumber };
        //TODO: Add user to database

        const token = await createUserSessionToken(idToken, ctx);
        return {
          token,
          user,
        };
      } catch (error: any) {
        throw new AuthError({ message: error.message });
      }
    },
    signIn: async (_, { idToken }, ctx: Context) => {
      try {
        const { id } = await verifyIdToken(idToken);

        if (!id) new AuthError({ message: 'User is not registered' });

        //TODO: Query user from the database
        const user = {
          uid: 'sdffsdfsd',
          displayName: 'fdsfsdfsd',
          email: 'fsdfsd@gmail.com',
          phoneNumber: '12345',
        };

        if (!user) {
          throw new AuthError({ message: 'User account does not exist' });
        }

        const token = createUserSessionToken(idToken, ctx);

        return {
          token,
          user,
        };
      } catch (error: any) {
        throw new AuthError({ message: error.message });
      }
    },
  },
};

export default resolvers;
