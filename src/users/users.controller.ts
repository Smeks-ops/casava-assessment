import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import {
  GetAllUsersByEmailQuery,
  GetAllUsersByNameQuery,
  GetUserByIdQuery,
  GetUserByEmailQuery,
} from './dto/get-users-query.dto';
import { DeactivateActivateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Create an admin and returns a token',
  })
  @Post('admin')
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAdmin(createUserDto);
  }

  @ApiOkResponse({
    description: 'Create a user and returns a token',
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOkResponse({
    description: 'Get all users by name',
    type: [CreateUserDto],
  })
  @ApiBearerAuth()
  @Get('allUsersByName')
  @UseGuards(JwtAuthGuard)
  getUsersByName(@Query() params: GetAllUsersByNameQuery) {
    const { limit = 10, offset = 0, name } = params;
    return plainToClass(
      CreateUserDto,
      this.usersService.getAllUsersByName(name, offset, limit),
    );
  }

  @ApiOkResponse({
    description: 'Get all users by email',
    type: [CreateUserDto],
  })
  @ApiBearerAuth()
  @Get('allUsersByEmail')
  @UseGuards(JwtAuthGuard)
  getUsersByEmail(@Query() params: GetAllUsersByEmailQuery) {
    const { limit = 10, offset = 0, email } = params;
    return plainToClass(
      CreateUserDto,
      this.usersService.getAllUsersByEmail(email, offset, limit),
    );
  }

  @ApiOkResponse({
    description: 'Gets a user by id',
  })
  @ApiBearerAuth()
  @Get('id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Query() params: GetUserByIdQuery) {
    const { id } = params;
    return plainToClass(CreateUserDto, this.usersService.findById(id));
  }

  @ApiOkResponse({
    description: 'Gets a user by email',
  })
  @ApiBearerAuth()
  @Get('email')
  @UseGuards(JwtAuthGuard)
  getUserByEmail(@Query() params: GetUserByEmailQuery) {
    const { email } = params;
    return plainToClass(CreateUserDto, this.usersService.findByEmail(email));
  }

  @ApiOkResponse({
    description: 'Toggle activate/deactivate a user',
  })
  @ApiBearerAuth()
  @Post('activate-deactivate')
  @UseGuards(JwtAuthGuard)
  async deactivateActivateUser(
    @Res() res,
    @Body() params: DeactivateActivateUserDto,
  ) {
    const { userId } = params;
    const active = await this.usersService.deactivateActivateUser(userId);
    if (active) {
      return res
        .status(200)
        .json({ message: 'users active status has been changed' });
    }
    return res
      .status(400)
      .json({ message: 'users active status has not been changed' });
  }
}
