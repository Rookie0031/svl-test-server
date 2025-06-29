import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

// Hello 요청 DTO
export class HelloDto {
  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
    required: false,
    minLength: 1,
    maxLength: 50
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: '인사말 언어',
    example: 'ko',
    required: false,
    default: 'ko'
  })
  @IsString()
  @IsOptional()
  language?: string = 'ko';
}

// Hello 응답 DTO
export class HelloResponseDto {
  @ApiProperty({
    description: '인사 메시지',
    example: '안녕하세요, 홍길동님!'
  })
  message: string;

  @ApiProperty({
    description: '현재 시간',
    example: '2024-01-01T00:00:00.000Z'
  })
  timestamp: string;

  @ApiProperty({
    description: '사용된 언어',
    example: 'ko'
  })
  language: string;
}

// 시스템 정보 DTO
export class SystemInfoDto {
  @ApiProperty({
    description: '애플리케이션 이름',
    example: 'Simple Test API'
  })
  appName: string;

  @ApiProperty({
    description: '버전',
    example: '1.0.0'
  })
  version: string;

  @ApiProperty({
    description: '환경',
    example: 'development'
  })
  environment: string;

  @ApiProperty({
    description: '서버 시작 시간',
    example: '2024-01-01T00:00:00.000Z'
  })
  uptime: string;

  @ApiProperty({
    description: '메모리 사용량 (MB)',
    example: 45.2
  })
  memoryUsage: number;
} 