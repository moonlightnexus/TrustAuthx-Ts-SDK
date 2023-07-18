import jwt from 'jsonwebtoken';
import axios from 'axios';

interface AuthLiteClientConstructorParams {
  apiKey: string;
  secretKey: string;
  orgId?: string | null;
}

class AuthLiteClient {
  private jwtEncode: (key: string, data: object) => string;
  private jwtDecode: (key: string, data: string) => object | string;
  private secretKey: string;
  private apiKey: string;
  private orgId?: string | null;
  private signedKey: string;

  constructor({ apiKey, secretKey, orgId }: AuthLiteClientConstructorParams) {
    this.jwtEncode = (key, data) => jwt.sign(data, key, { algorithm: 'HS256' });
    this.jwtDecode = (key, data) => jwt.verify(data, key, { algorithms: ['HS256'] });
    this.secretKey = secretKey;
    this.apiKey = apiKey;
    this.orgId = orgId;
    this.signedKey = this.jwtEncode(this.secretKey, { api_key: this.apiKey });
  }

  generateUrl(): string {
    if (this.orgId) {
      return `https://app.trustauthx.com/widget/login/${this.orgId}`;
    } else {
      return '';
    }
  }

  async getUser(token: string): Promise<object | string> {
    const url = 'https://api.trustauthx.com/api/user/me/auth/data';
    const headers = { accept: 'application/json' };
    const params = {
      UserToken: token,
      api_key: this.apiKey,
      signed_key: this.signedKey,
    };
    try {
      const response = await axios.get(url, { headers, params });
      if (response.status === 200) {
        return this.jwtDecode(this.secretKey, response.data);
      } else {
        throw new Error(
          `Request failed with status code : ${response.status} \n this code contains a msg : ${response.data}`
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getAccessTokenFromRefreshToken(refreshToken: string): Promise<object | string> {
    const url = 'https://api.trustauthx.com/api/user/me/access/token/';
    const headers = { accept: 'application/json' };
    const params = {
      RefreshToken: refreshToken,
      api_key: this.apiKey,
      signed_key: this.signedKey,
    };
    try {
      const response = await axios.get(url, { headers, params });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          `Request failed with status code : ${response.status} \n this code contains a msg : ${response.data}`
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async validateAccessToken(accessToken: string): Promise<object | string> {
    const url = 'https://api.trustauthx.com/api/user/me/auth/validate/token';
    const headers = { accept: 'application/json' };
    const params = {
      AccessToken: accessToken,
      api_key: this.apiKey,
      signed_key: this.signedKey,
    };
    try {
      const response = await axios.get(url, { headers, params });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          `Request failed with status code : ${response.status} \n this code contains a msg : ${response.data}`
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
