import { decrypt, encrypt } from 'crypto-js/aes'
import UTF8, { parse } from 'crypto-js/enc-utf8'
import pkcs7 from 'crypto-js/pad-pkcs7'

export interface EncryptionParams {
  key: string
  iv: string
}

export class AesEncryption {
  private key
  private iv

  constructor() {
    this.key = parse('myltx')
    this.iv = parse('note')
  }

  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, {
      padding: pkcs7,
      iv: this.iv
    }).toString()
  }

  decryptByAES(cipherText: string) {
    if (!cipherText) {
      return ''
    }
    return decrypt(cipherText, this.key, {
      padding: pkcs7,
      iv: this.iv
    }).toString(UTF8)
  }
}
