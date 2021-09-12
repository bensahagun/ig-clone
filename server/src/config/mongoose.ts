const DB_NAME = process.env.MONGODB_DATABASE;
const DB_USER = process.env.MONGODB_USER;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;
const DB_HOST = process.env.MONGODB_HOST;
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

export { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, uri };
