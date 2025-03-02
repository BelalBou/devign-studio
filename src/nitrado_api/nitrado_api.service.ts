import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { Readable } from 'stream';

@Injectable()
export class NitradoApiService {
  private readonly BASE_URL = 'http://167.86.106.175:5000/';
  private token: string;

  constructor() {}

  // Permet de définir le token une seule fois pour l'instance
  setToken(token: string) {
    this.token = token;
  }

  private async request(
    method: 'get' | 'post' | 'delete',
    endpoint: string,
    data?: any,
  ) {
    if (!this.token) {
      throw new HttpException('Token non défini', HttpStatus.UNAUTHORIZED);
    }

    try {
      const headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios({
        method,
        url: `${this.BASE_URL}${endpoint}`,
        headers,
        data,
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erreur API Nitrado: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getServices() {
    return this.request('get', 'services');
  }

  async getServiceDetails(serviceId: string) {
    return this.request('get', `services/${serviceId}`);
  }

  async restartServer(serviceId: string) {
    return this.request('post', `services/${serviceId}/restart`);
  }

  async stopServer(serviceId: string) {
    return this.request('post', `services/${serviceId}/stop`);
  }

  async downloadFile(serviceId: string, filePath: string) {
    return this.request(
      'get',
      `services/${serviceId}/download?file=${encodeURIComponent(filePath)}`,
    );
  }

  async uploadFile(
    serviceId: string,
    remoteDir: string,
    remoteFileName: string,
    fileBuffer: Buffer,
  ) {
    try {
      const formData = new FormData();
      const fileStream = Readable.from(fileBuffer); // ✅ Convertit Buffer en flux lisible

      formData.append('file', fileStream, remoteFileName);

      const response = await axios.post(
        `${this.BASE_URL}services/${serviceId}/upload?dir=${encodeURIComponent(remoteDir)}&fileName=${encodeURIComponent(remoteFileName)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            ...formData.getHeaders(),
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Erreur API Nitrado: ${error.response?.data?.message || error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async listFiles(serviceId: string, directoryPath: string) {
    return this.request(
      'get',
      `services/${serviceId}/files?dir=${directoryPath}`,
    );
  }

  async deleteFile(serviceId: string, filePath: string) {
    return this.request(
      'delete',
      `services/${serviceId}/delete?file=${filePath}`,
    );
  }

  async getWhitelist(serviceId: string) {
    return this.request('get', `services/${serviceId}/whitelist`);
  }

  async addPlayerToWhitelist(serviceId: string, playerId: string) {
    return this.request('post', `services/${serviceId}/whitelist/add`, {
      playerId,
    });
  }

  async removePlayerFromWhitelist(serviceId: string, playerId: string) {
    return this.request('delete', `services/${serviceId}/whitelist/remove`, {
      playerId,
    });
  }

  async getBanlist(serviceId: string) {
    return this.request('get', `services/${serviceId}/bans`);
  }

  async addPlayerToBanlist(serviceId: string, playerId: string) {
    return this.request('post', `services/${serviceId}/bans/add`, { playerId });
  }

  async removePlayerFromBanlist(serviceId: string, playerId: string) {
    return this.request('delete', `services/${serviceId}/bans/remove`, {
      playerId,
    });
  }

  async getPriorityList(serviceId: string) {
    return this.request('get', `services/${serviceId}/priority`);
  }

  async addPlayerToPriority(serviceId: string, playerId: string) {
    return this.request('post', `services/${serviceId}/priority/add`, {
      playerId,
    });
  }

  async removePlayerFromPriority(serviceId: string, playerId: string) {
    return this.request('delete', `services/${serviceId}/priority/remove`, {
      playerId,
    });
  }

  async enableSetting(serviceId: string, key: string) {
    return this.request('post', `services/${serviceId}/settings/enable`, {
      key,
    });
  }

  async disableSetting(serviceId: string, key: string) {
    return this.request('post', `services/${serviceId}/settings/disable`, {
      key,
    });
  }

  async updateSetting(serviceId: string, key: string, value: any) {
    return this.request('post', `services/${serviceId}/settings/update`, {
      key,
      value,
    });
  }
}
