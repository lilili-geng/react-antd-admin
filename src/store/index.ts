// index.ts入口
import User from "./modules/user.ts";
import Layout from "./modules/layout.ts";
export default {
  ...User,
  ...Layout,
};