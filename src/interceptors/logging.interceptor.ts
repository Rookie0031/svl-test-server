import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const startTime = Date.now();

    // 요청 로그
    this.logger.log(
      `📨 ${method} ${url} - ${ip} - ${userAgent} - Started`,
    );

    return next.handle().pipe(
      tap({
        next: (responseData) => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          const { statusCode } = response;
          
          // 성공 응답 로그
          this.logger.log(
            `✅ ${method} ${url} - ${statusCode} - ${responseTime}ms - Completed`,
          );

          // 응답 데이터가 있고 개발 환경인 경우 응답 내용도 로그
          if (process.env.NODE_ENV === 'development' && responseData) {
            this.logger.debug(
              `📤 Response Data: ${JSON.stringify(responseData, null, 2)}`,
            );
          }
        },
        error: (error) => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          const { statusCode } = response;
          
          // 에러 로그
          this.logger.error(
            `❌ ${method} ${url} - ${statusCode || 500} - ${responseTime}ms - Error: ${error.message}`,
            error.stack,
          );
        },
      }),
    );
  }
}