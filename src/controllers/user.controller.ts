import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { 
  CreateUserDto, 
  UpdateUserDto, 
  UserResponseDto, 
  GetUsersDto 
} from '../dto/user.dto';
import { ApiResponseDto } from '../dto/common.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: '사용자 생성', 
    description: '새로운 사용자를 생성합니다.' 
  })
  @ApiBody({ 
    type: CreateUserDto,
    description: '생성할 사용자 정보'
  })
  @ApiCreatedResponse({ 
    description: '사용자가 성공적으로 생성됨',
    type: ApiResponseDto<UserResponseDto>
  })
  @ApiConflictResponse({ 
    description: '이미 존재하는 이메일',
    type: ApiResponseDto<null>
  })
  @ApiBadRequestResponse({ 
    description: '잘못된 요청 데이터',
    type: ApiResponseDto<null>
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ApiResponseDto<UserResponseDto>> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ 
    summary: '사용자 목록 조회', 
    description: '페이지네이션과 필터링을 지원하는 사용자 목록을 조회합니다.' 
  })
  @ApiQuery({ name: 'page', required: false, description: '페이지 번호', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '페이지당 항목 수', example: 10 })
  @ApiQuery({ name: 'search', required: false, description: '이름 검색', example: '홍' })
  @ApiQuery({ name: 'role', required: false, description: '역할 필터', enum: ['admin', 'user', 'guest'] })
  @ApiOkResponse({ 
    description: '사용자 목록 조회 성공',
    type: ApiResponseDto
  })
  async getUsers(@Query() query: GetUsersDto) {
    return this.userService.getUsers(query);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: '사용자 상세 조회', 
    description: '특정 사용자의 상세 정보를 조회합니다.' 
  })
  @ApiParam({ name: 'id', description: '사용자 ID', example: 1 })
  @ApiOkResponse({ 
    description: '사용자 정보 조회 성공',
    type: ApiResponseDto<UserResponseDto>
  })
  @ApiNotFoundResponse({ 
    description: '사용자를 찾을 수 없음',
    type: ApiResponseDto<null>
  })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDto<UserResponseDto>> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: '사용자 정보 수정', 
    description: '특정 사용자의 정보를 수정합니다.' 
  })
  @ApiParam({ name: 'id', description: '사용자 ID', example: 1 })
  @ApiBody({ 
    type: UpdateUserDto,
    description: '수정할 사용자 정보'
  })
  @ApiOkResponse({ 
    description: '사용자 정보 수정 성공',
    type: ApiResponseDto<UserResponseDto>
  })
  @ApiNotFoundResponse({ 
    description: '사용자를 찾을 수 없음',
    type: ApiResponseDto<null>
  })
  @ApiConflictResponse({ 
    description: '이미 존재하는 이메일',
    type: ApiResponseDto<null>
  })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ApiResponseDto<UserResponseDto>> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: '사용자 삭제', 
    description: '특정 사용자를 삭제합니다.' 
  })
  @ApiParam({ name: 'id', description: '사용자 ID', example: 1 })
  @ApiOkResponse({ 
    description: '사용자 삭제 성공',
    type: ApiResponseDto<null>
  })
  @ApiNotFoundResponse({ 
    description: '사용자를 찾을 수 없음',
    type: ApiResponseDto<null>
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDto<null>> {
    return this.userService.deleteUser(id);
  }
} 