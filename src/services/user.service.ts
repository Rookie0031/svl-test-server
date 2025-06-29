import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { 
  CreateUserDto, 
  UpdateUserDto, 
  UserResponseDto, 
  GetUsersDto,
  UserRole, 
  UserStatus 
} from '../dto/user.dto';
import { ApiResponseDto, PaginationResponseDto } from '../dto/common.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  
  // 임시 데이터 저장소 (실제로는 데이터베이스 사용)
  private users: UserResponseDto[] = [
    {
      id: 1,
      name: '관리자',
      email: 'admin@example.com',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      name: '홍길동',
      email: 'hong@example.com',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  ];

  private nextId = 3;

  // 사용자 생성
  async createUser(createUserDto: CreateUserDto): Promise<ApiResponseDto<UserResponseDto>> {
    this.logger.log(`👤 Creating new user with email: ${createUserDto.email}`);
    
    // 이메일 중복 확인
    const existingUser = this.users.find(user => user.email === createUserDto.email);
    if (existingUser) {
      this.logger.warn(`⚠️ Attempt to create user with existing email: ${createUserDto.email}`);
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const newUser: UserResponseDto = {
      id: this.nextId++,
      name: createUserDto.name,
      email: createUserDto.email,
      role: createUserDto.role || UserRole.USER,
      status: UserStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.users.push(newUser);

    this.logger.log(`✅ User created successfully with ID: ${newUser.id}`);

    return {
      success: true,
      message: '사용자가 성공적으로 생성되었습니다.',
      data: newUser,
      timestamp: new Date().toISOString()
    };
  }

  // 사용자 목록 조회 (페이지네이션 포함)
  async getUsers(query: GetUsersDto): Promise<ApiResponseDto<{ users: UserResponseDto[], pagination: PaginationResponseDto }>> {
    let filteredUsers = [...this.users];

    // 검색 필터 적용
    if (query.search && query.search.trim()) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(query.search!.toLowerCase())
      );
    }

    // 역할 필터 적용
    if (query.role) {
      filteredUsers = filteredUsers.filter(user => user.role === query.role);
    }

    // 페이지네이션 계산
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const pagination: PaginationResponseDto = {
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit)
    };

    return {
      success: true,
      message: '사용자 목록을 성공적으로 조회했습니다.',
      data: {
        users: paginatedUsers,
        pagination
      },
      timestamp: new Date().toISOString()
    };
  }

  // 사용자 상세 조회
  async getUserById(id: number): Promise<ApiResponseDto<UserResponseDto>> {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return {
      success: true,
      message: '사용자 정보를 성공적으로 조회했습니다.',
      data: user,
      timestamp: new Date().toISOString()
    };
  }

  // 사용자 정보 업데이트
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<ApiResponseDto<UserResponseDto>> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 이메일 중복 확인 (자신 제외)
    if (updateUserDto.email) {
      const existingUser = this.users.find(user => 
        user.email === updateUserDto.email && user.id !== id
      );
      if (existingUser) {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }
    }

    // 사용자 정보 업데이트
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date().toISOString()
    };

    return {
      success: true,
      message: '사용자 정보가 성공적으로 업데이트되었습니다.',
      data: this.users[userIndex],
      timestamp: new Date().toISOString()
    };
  }

  // 사용자 삭제
  async deleteUser(id: number): Promise<ApiResponseDto<null>> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    this.users.splice(userIndex, 1);

    return {
      success: true,
      message: '사용자가 성공적으로 삭제되었습니다.',
      data: null,
      timestamp: new Date().toISOString()
    };
  }
} 