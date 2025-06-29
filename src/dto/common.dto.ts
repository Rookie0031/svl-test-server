import { ApiProperty } from '@nestjs/swagger';

// 공통 응답 DTO
export class ApiResponseDto<T> {
  @ApiProperty({ description: '응답 성공 여부', example: true })
  success: boolean;

  @ApiProperty({ description: '응답 메시지', example: '요청이 성공적으로 처리되었습니다.' })
  message: string;

  @ApiProperty({ description: '응답 데이터' })
  data?: T;

  @ApiProperty({ description: '응답 시간', example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;
}

// 에러 응답 DTO
export class ErrorResponseDto {
  @ApiProperty({ description: '에러 코드', example: 400 })
  statusCode: number;

  @ApiProperty({ description: '에러 메시지', example: '잘못된 요청입니다.' })
  message: string;

  @ApiProperty({ description: '에러 타입', example: 'Bad Request' })
  error: string;

  @ApiProperty({ description: '에러 발생 시간', example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;
}

// 페이지네이션 DTO
export class PaginationDto {
  @ApiProperty({ description: '페이지 번호', example: 1, minimum: 1 })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', example: 10, minimum: 1, maximum: 100 })
  limit: number;
}

export class PaginationResponseDto {
  @ApiProperty({ description: '전체 항목 수', example: 100 })
  total: number;

  @ApiProperty({ description: '현재 페이지', example: 1 })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', example: 10 })
  limit: number;

  @ApiProperty({ description: '전체 페이지 수', example: 10 })
  totalPages: number;
} 