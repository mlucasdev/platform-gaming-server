import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is running! 🚀\n https://platform-gaming-server-production.up.railway.app/api/ for Swagger docs...';
  }
}
