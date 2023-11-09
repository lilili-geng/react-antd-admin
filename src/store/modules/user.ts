// 示例封装
import { atom, selector } from "recoil";

const userItem = {
  userInfo: {}
}

const userState = atom({
  key: "userInfoState",
  default: userItem,
});

export default {
  UserState: atom({
    key: "UserState",
    default: userItem.userInfo,
  }),
  useUserState: selector({
    key: "useUserState",
    get: ({ get }) => {
      return get(userState);
    },
    set: ({ get, set }, newValue) => {
      const oldValue = get(userState);
      const updateValue = Object.assign({}, oldValue, newValue);
      set(userState, updateValue);
    },
  }),
};