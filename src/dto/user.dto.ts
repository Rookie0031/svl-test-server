import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';

// 사용자 역할 enum
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// 사용자 상태 enum
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

// 사용자 생성 DTO
export class CreateUserDto {
  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: '이메일 주소',
    example: 'hong@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123',
    minLength: 8
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: '사용자 역할',
    enum: UserRole,
    example: UserRole.USER,
    default: UserRole.USER
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

// 사용자 업데이트 DTO
export class UpdateUserDto {
  @ApiProperty({
    description: '사용자 이름',
    example: '김철수',
    required: false
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: '이메일 주소',
    example: 'kim@example.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: '사용자 상태',
    enum: UserStatus,
    example: UserStatus.ACTIVE,
    required: false
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}

// 사용자 응답 DTO
export class UserResponseDto {
  @ApiProperty({ description: '사용자 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '사용자 이름', example: '홍길동' })
  name: string;

  @ApiProperty({ description: '이메일 주소', example: 'hong@example.com' })
  email: string;

  @ApiProperty({ description: '사용자 역할', enum: UserRole, example: UserRole.USER })
  role: UserRole;

  @ApiProperty({ description: '사용자 상태', enum: UserStatus, example: UserStatus.ACTIVE })
  status: UserStatus;

  @ApiProperty({ description: '생성 시간', example: '2024-01-01T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ description: '수정 시간', example: '2024-01-01T00:00:00.000Z' })
  updatedAt: string;
}

// 사용자 목록 조회 DTO
export class GetUsersDto {
  @ApiProperty({ description: '페이지 번호', example: 1, required: false, default: 1 })
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ description: '페이지당 항목 수', example: 10, required: false, default: 10 })
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({ description: '검색할 이름', example: '홍', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ description: '사용자 역할 필터', enum: UserRole, required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
} 