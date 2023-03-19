import * as crypto from 'crypto';
import  config  from '../config';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class EncryptionService {

    private algorithm: string = 'aes-256-cbc';
    private key: crypto.BinaryLike;
    private iv: crypto.BinaryLike;
  
    constructor() {
      const hashedSecret = crypto.createHash('sha256').update(String(config.cryptoSecret)).digest('base64').slice(0, 32);
      this.key = hashedSecret;
      this.iv = crypto.randomBytes(16);
    }
  
    encrypt(text: string): string {
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    }
  
    decrypt(encrypted: string): string {
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }
}