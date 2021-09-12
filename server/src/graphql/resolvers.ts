const resolvers = {
  Query: {
    users: () => {
      return [{ username: 'ben', fullName: 'ben sah' }];
    },
  },
};

export default resolvers;
