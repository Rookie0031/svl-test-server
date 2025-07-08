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
    const { method, url, ip, headers, body, query, params } = request;
    const userAgent = headers['user-agent'] || 'Unknown';
    const clientIp = ip || 'Unknown';
    const startTime = Date.now();

    // Health check 엔드포인트는 로그를 찍지 않음
    if (url === '/health') {
      return next.handle();
    }

    // API별 구체적인 요청 로그 메시지 생성
    const requestLogMessage = this.generateRequestLogMessage(method, url, clientIp, userAgent, body, query, params);
    this.logger.log(requestLogMessage);

    return next.handle().pipe(
      tap({
        next: (responseData) => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          const { statusCode } = response;
          
          // API별 구체적인 성공 응답 로그 메시지 생성
          const successLogMessage = this.generateSuccessLogMessage(method, url, statusCode, responseTime, responseData);
          this.logger.log(successLogMessage);

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
          
          // API별 구체적인 에러 로그 메시지 생성
          const errorLogMessage = this.generateErrorLogMessage(method, url, statusCode || 500, responseTime, error);
          this.logger.error(errorLogMessage, error.stack);
        },
      }),
    );
  }

  /**
   * API별 구체적인 요청 로그 메시지 생성
   */
  private generateRequestLogMessage(
    method: string, 
    url: string, 
    ip: string, 
    userAgent: string, 
    body: any, 
    query: any, 
    params: any
  ): string {
    const baseMessage = `📨 ${method} ${url} - ${ip} - ${userAgent}`;
    
    // API별 구체적인 메시지 추가
    const apiSpecificMessage = this.getApiSpecificRequestMessage(method, url, body, query, params);
    
    return `${baseMessage} - ${apiSpecificMessage}`;
  }

  /**
   * API별 구체적인 성공 응답 로그 메시지 생성
   */
  private generateSuccessLogMessage(
    method: string, 
    url: string, 
    statusCode: number, 
    responseTime: number, 
    responseData: any
  ): string {
    const baseMessage = `✅ ${method} ${url} - ${statusCode} - ${responseTime}ms`;
    
    // API별 구체적인 메시지 추가
    const apiSpecificMessage = this.getApiSpecificSuccessMessage(method, url, responseData);
    
    return `${baseMessage} - ${apiSpecificMessage}`;
  }

  /**
   * API별 구체적인 에러 로그 메시지 생성
   */
  private generateErrorLogMessage(
    method: string, 
    url: string, 
    statusCode: number, 
    responseTime: number, 
    error: any
  ): string {
    const baseMessage = `❌ ${method} ${url} - ${statusCode} - ${responseTime}ms`;
    
    // API별 구체적인 에러 메시지 추가
    const apiSpecificMessage = this.getApiSpecificErrorMessage(method, url, error);
    
    return `${baseMessage} - ${apiSpecificMessage}`;
  }

  /**
   * API별 구체적인 요청 메시지 생성
   */
  private getApiSpecificRequestMessage(method: string, url: string, body: any, query: any, params: any): string {
    // 기본 API
    if (url === '/' && method === 'GET') {
      return 'Hello World API 요청';
    }
    
    if (url === '/hello' && method === 'GET') {
      const name = query.name || 'Guest';
      const language = query.language || 'ko';
      return `개인화된 인사말 API 요청 - 이름: ${name}, 언어: ${language}`;
    }
    
    if (url === '/system' && method === 'GET') {
      return '시스템 정보 조회 API 요청';
    }

    // 사용자 관리 API
    if (url === '/users' && method === 'POST') {
      const email = body?.email || 'unknown';
      const name = body?.name || 'unknown';
      return `사용자 생성 API 요청 - 이메일: ${email}, 이름: ${name}`;
    }
    
    if (url === '/users' && method === 'GET') {
      const page = query.page || 1;
      const limit = query.limit || 10;
      const search = query.search || '없음';
      const role = query.role || '전체';
      return `사용자 목록 조회 API 요청 - 페이지: ${page}, 개수: ${limit}, 검색: ${search}, 역할: ${role}`;
    }
    
    if (url.match(/^\/users\/\d+$/) && method === 'GET') {
      const userId = params.id || 'unknown';
      return `사용자 상세 조회 API 요청 - 사용자 ID: ${userId}`;
    }
    
    if (url.match(/^\/users\/\d+$/) && method === 'PUT') {
      const userId = params.id || 'unknown';
      const updateFields = Object.keys(body || {}).join(', ') || '없음';
      return `사용자 정보 수정 API 요청 - 사용자 ID: ${userId}, 수정 필드: ${updateFields}`;
    }
    
    if (url.match(/^\/users\/\d+$/) && method === 'DELETE') {
      const userId = params.id || 'unknown';
      return `사용자 삭제 API 요청 - 사용자 ID: ${userId}`;
    }

    return 'API 요청';
  }

  /**
   * API별 구체적인 성공 메시지 생성
   */
  private getApiSpecificSuccessMessage(method: string, url: string, responseData: any): string {
    // 기본 API
    if (url === '/' && method === 'GET') {
      return 'Hello World 메시지 반환 완료';
    }
    
    if (url === '/hello' && method === 'GET') {
      const language = responseData?.language || 'unknown';
      return `개인화된 인사말 반환 완료 (언어: ${language})`;
    }
    
    if (url === '/system' && method === 'GET') {
      const memoryUsage = responseData?.memoryUsage || 'unknown';
      return `시스템 정보 반환 완료 (메모리 사용량: ${memoryUsage}MB)`;
    }

    // 사용자 관리 API
    if (url === '/users' && method === 'POST') {
      const userId = responseData?.data?.id || 'unknown';
      return `사용자 생성 완료 - 새 사용자 ID: ${userId}`;
    }
    
    if (url === '/users' && method === 'GET') {
      const userCount = responseData?.data?.users?.length || 0;
      const total = responseData?.data?.pagination?.total || 0;
      return `사용자 목록 조회 완료 - 조회된 사용자: ${userCount}명, 전체: ${total}명`;
    }
    
    if (url.match(/^\/users\/\d+$/) && method === 'GET') {
      const userName = responseData?.data?.name || 'unknown';
      return `사용자 상세 조회 완료 - 사용자: ${userName}`;
    }
    
    if (url.match(/^\/users\/\d+$/) && method === 'PUT') {
      const userName = responseData?.data?.name || 'unknown';
      return `사용자 정보 수정 완료 - 사용자: ${userName}`;
    }
    
    if (url.match(/^\/users\/\d+$/) && method === 'DELETE') {
      return '사용자 삭제 완료';
    }

    return 'API 처리 완료';
  }

  /**
   * API별 구체적인 에러 메시지 생성
   */
  private getApiSpecificErrorMessage(method: string, url: string, error: any): string {
    const errorMessage = error.message || '알 수 없는 오류';
    
    // 기본 API
    if (url === '/' && method === 'GET') {
      return `Hello World API 오류: ${errorMessage}`;
    }
    
    if (url === '/hello' && method === 'GET') {
      return `개인화된 인사말 API 오류: ${errorMessage}`;
    }
    
    if (url === '/system' && method === 'GET') {
      return `시스템 정보 조회 API 오류: ${errorMessage}`;
    }

    // 사용자 관리 API
    if (url === '/users' && method === 'POST') {
      return `사용자 생성 API 오류: ${errorMessage}`;
    }
    
    if (url === '/users' && method === 'GET') {
      return `사용자 목록 조회 API 오류: ${errorMessage}`;
    }
    
    if (url.match(/^\/users\/\d+$/) && method === 'GET') {
      const userId = url.split('/').pop() || 'unknown';
      return `사용자 상세 조회 API 오류 (ID: ${userId}): ${errorMessage}`;
    }
    
    if (url.match(/^\/users\/\d+$/) && method === 'PUT') {
      const userId = url.split('/').pop() || 'unknown';
      return `사용자 정보 수정 API 오류 (ID: ${userId}): ${errorMessage}`;
    }
    
    if (url.match(/^\/users\/\d+$/) && method === 'DELETE') {
      const userId = url.split('/').pop() || 'unknown';
      return `사용자 삭제 API 오류 (ID: ${userId}): ${errorMessage}`;
    }

    return `API 오류: ${errorMessage}`;
  }
}