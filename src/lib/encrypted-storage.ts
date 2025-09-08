import { AES, enc } from 'crypto-js';

const SECRET_KEY = `${import.meta.env.VITE_SECRET_KEY}`;

export const EncryptedStorage = {
  save: (key: string, data: unknown) => {
    const json = JSON.stringify(data);
    const encrypted = AES.encrypt(json, SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
  },
  load: (key: string) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const bytes = AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = bytes.toString(enc.Utf8);
      return JSON.parse(decrypted) as unknown;
    } catch (e) {
      console.error('Error al desencriptar:', e);
      return null;
    }
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
