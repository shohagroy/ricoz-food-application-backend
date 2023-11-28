import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  bycrypt_salt_rounds: Number(process.env.BYCRYPT_SALT_ROUND) || 10,
  secrect_token_key: process.env.SECTECT_TOKEN_KEY,
  expires_in: process.env.EXPIRES_IN,
  refresh_expires_in: process.env.REFESH_EXPIRES_IN,
};
