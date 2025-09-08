import { AES, enc } from 'crypto-js';

const SECRET_KEY = `${import.meta.env.VITE_SECRET_KEY}`;

export const Encryptor = {
  encrypt: (data: unknown): string => {
    const json = JSON.stringify(data);
    const encrypted = AES.encrypt(json, SECRET_KEY).toString();
    return encrypted;
  },

  decrypt: (cipherText: string): unknown => {
    try {
      const bytes = AES.decrypt(cipherText, SECRET_KEY);
      const decrypted = bytes.toString(enc.Utf8);
      return JSON.parse(decrypted) as unknown;
    } catch (error) {
      console.error('Error al desencriptar:', error);
      return null;
    }
  },
};
