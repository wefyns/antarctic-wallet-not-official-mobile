import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from 'api/auth';

type Stored = { token: string; user: User };

class UserStoreClass {
  static instance: UserStoreClass | null = null;

  userKey = 'user_v1';

  constructor() {
    if (UserStoreClass.instance) {
      return UserStoreClass.instance;
    }

    UserStoreClass.instance = this;
    return this;
  }

  async get(): Promise<Stored | null> {
    try {
      const v = await AsyncStorage.getItem(this.userKey);
      if (!v) return null;
      return JSON.parse(v) as Stored;
    } catch (e) {
      console.warn('UserStore.get error', e);
      return null;
    }
  }

  async save(data: Stored): Promise<void> {
    try {
      await AsyncStorage.setItem(this.userKey, JSON.stringify(data));
    } catch (e) {
      console.warn('UserStore.save error', e);
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.userKey);
    } catch (e) {
      console.warn('UserStore.clear error', e);
    }
  }
}

export const UserStore = new UserStoreClass();
export default UserStore;