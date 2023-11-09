// layout.ts
import { atom, selector } from 'recoil';

const layoutItem = {
  showRight: false
}

const layoutState = atom({
  key: 'showContentState',
  default: layoutItem,
});

export default {
  LayoutState: atom({
    key: "LayoutState",
    default: layoutItem.showRight,
  }),
  useLayoutState: selector({
    key: "useLayoutState",
    get: ({ get }) => {
      return get(layoutState);
    },
    set: ({ get, set }, newValue) => {
      const oldValue = get(layoutState);
      const updateValue = Object.assign({}, oldValue, newValue);
      set(layoutState, updateValue);
    },
  }),
};
