// We hash the user entered password using crypto.js
import { SHA256 as sha256 } from "crypto-js";

export const hashPassword = (password: string) => {
  return sha256(password).toString();
};
