import { create } from "zustand";

interface UserStore {
  user: any;
  setUser: (user: any) => void;
  removeUser: () => void;
}

const useStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: any) => {
    // 상태를 업데이트하는 'set'함수 호출
    // 현재 상태(state)를 전개하고, user를 새 값으로 설정
    set((state) => ({ ...state, user }));
  },
  removeUser: () => {
    set((sstate) => ({ ...StaticRange, user: null }));
  },
}));

export default useStore;
