import { Injectable, Logger } from '@nestjs/common';
import { HelloResponseDto, SystemInfoDto } from './dto/hello.dto';
import { ApiResponseDto } from './dto/common.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private startTime = new Date();

  getHello(): string {
    return 'Hello World!';
  }

  getPersonalizedHello(name?: string, language: string = 'ko'): HelloResponseDto {
    this.logger.log(`🌍 Getting personalized hello for name: ${name || 'Guest'}, language: ${language}`);
    
    let message: string;
    
    switch (language) {
      case 'en':
        message = name ? `Hello, ${name}!` : 'Hello, Guest!';
        break;
      case 'ja':
        message = name ? `こんにちは、${name}さん！` : 'こんにちは、ゲストさん！';
        break;
      case 'ko':
      default:
        message = name ? `안녕하세요, ${name}님!` : '안녕하세요, 손님님!';
        break;
    }
    
    return {
      message,
      timestamp: new Date().toISOString(),
      language
    };
  }

  getSystemInfo(): SystemInfoDto {
    this.logger.log('📊 Getting system information');
    
    const memoryUsage = process.memoryUsage();
    const uptime = new Date(this.startTime.getTime() + process.uptime() * 1000).toISOString();

    return {
      appName: 'Simple Test API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime,
      memoryUsage: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100
    };
  }

  getHealthCheck(): ApiResponseDto<{ status: string; timestamp: string }> {
    return {
      success: true,
      message: '서비스가 정상적으로 작동 중입니다.',
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };
  }
}
