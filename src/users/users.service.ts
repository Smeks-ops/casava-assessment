import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createAdmin(createUserDto: CreateUserDto) {
    // check if the email already exists
    const isExist = await this.findByEmail(createUserDto.email);
    if (isExist) throw new BadRequestException('Email already exists');

    const createUserPayload = new User();
    createUserPayload.name = createUserDto.name;
    createUserPayload.email = createUserDto.email;
    createUserPayload.password = createUserDto.password;
    createUserPayload.userRole = 'admin';

    const result = await this.userRepository.save(createUserPayload);

    // use the id and email of the registered user to create a token
    const payload = {
      id: result.id,
      email: result.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    // check if the email already exists
    const isExist = await this.findByEmail(createUserDto.email);
    if (isExist) throw new BadRequestException('Email already exists');

    const createUserPayload = new User();
    createUserPayload.name = createUserDto.name;
    createUserPayload.email = createUserDto.email;
    createUserPayload.password = createUserDto.password;

    const result = await this.userRepository.save(createUserPayload);

    // use the id and email of the registered user to create a token
    const payload = {
      id: result.id,
      email: result.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findById(id: string): Promise<User> {
    return await User.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await User.find();
  }

  async getAllUsersByName(name: string, offset: number, limit: number) {
    const query = await this.userRepository
      .createQueryBuilder('user')
      .where('user.name = :name', { name: name })
      .andWhere('user.isDeactivated is false')
      .skip(offset)
      .take(limit);
    return query.getMany();
  }

  async getAllUsersByEmail(email: string, offset: number, limit: number) {
    const query = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .andWhere('user.isDeactivated is false')
      .skip(offset)
      .take(limit);
    return query.getMany();
  }

  async deactivateActivateUser(userId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    if (user.isDeactivated === false) {
      return this.userRepository.update(
        { id: userId },
        { isDeactivated: true },
      );
    }
    return this.userRepository.update({ id: userId }, { isDeactivated: false });
  }
}
