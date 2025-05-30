/* eslint-disable @typescript-eslint/no-unused-vars */
import storage from "redux-persist/lib/storage";

const EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

const expireStorage = {
  async setItem(key: string, value: string) {
    const item = {
      value,
      expiry: new Date().getTime() + EXPIRY_TIME,
    };
    return storage.setItem(key, JSON.stringify(item));
  },
  async getItem(key: string) {
    const itemStr = await storage.getItem(key);
    if (!itemStr) {
      return null;
    }

    try {
      const item = JSON.parse(itemStr);
      if (new Date().getTime() > item.expiry) {
        await storage.removeItem(key); // Expired, remove it
        return null;
      }
      return item.value;
    } catch (e: any) {
      // Fallback if JSON parsing fails
      return null;
    }
  },
  async removeItem(key: string) {
    return storage.removeItem(key);
  },
};

export default expireStorage;
