import { Controller, Get, Query } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiQuery,
  ApiOkResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { HelloDto, HelloResponseDto, SystemInfoDto } from './dto/hello.dto';
import { ApiResponseDto } from './dto/common.dto';

@ApiTags('default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Hello World API', 
    description: '기본 Hello World 메시지를 반환합니다.' 
  })
  @ApiOkResponse({ 
    description: '성공적으로 Hello World 메시지를 반환',
    schema: {
      type: 'string',
      example: 'Hello World!'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  @ApiOperation({ 
    summary: '개인화된 인사말 API', 
    description: '사용자 이름과 언어를 받아서 개인화된 인사말을 반환합니다.' 
  })
  @ApiQuery({ 
    name: 'name', 
    required: false, 
    description: '사용자 이름',
    example: '홍길동'
  })
  @ApiQuery({ 
    name: 'language', 
    required: false, 
    description: '인사말 언어 (ko, en, ja)',
    example: 'ko',
    enum: ['ko', 'en', 'ja']
  })
  @ApiOkResponse({ 
    description: '성공적으로 개인화된 인사말을 반환',
    type: HelloResponseDto
  })
  getPersonalizedHello(@Query() query: HelloDto): HelloResponseDto {
    return this.appService.getPersonalizedHello(query.name, query.language);
  }

  @Get('health')
  @ApiOperation({ 
    summary: '헬스 체크 API', 
    description: '서비스의 상태를 확인합니다.' 
  })
  @ApiOkResponse({ 
    description: '서비스가 정상적으로 작동 중',
    type: ApiResponseDto
  })
  @ApiInternalServerErrorResponse({ 
    description: '서비스 오류',
    type: ApiResponseDto
  })
  getHealthCheck(): ApiResponseDto<{ status: string; timestamp: string }> {
    return this.appService.getHealthCheck();
  }

  @Get('system')
  @ApiOperation({ 
    summary: '시스템 정보 API', 
    description: '애플리케이션의 시스템 정보를 반환합니다.' 
  })
  @ApiOkResponse({ 
    description: '시스템 정보 조회 성공',
    type: SystemInfoDto
  })
  getSystemInfo(): SystemInfoDto {
    return this.appService.getSystemInfo();
  }
}
