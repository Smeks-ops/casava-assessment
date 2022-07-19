import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            validateUser: jest.fn(),
            validatePassword: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const result = {
        access_token: 'eyJhbGciOiJIUzI',
      };

      const payload = {
        email: 'test@mail.com',
        password: 'test_password',
      };

      const user = {
        id: 'c209c48b-4d33-4edc-8318-501bf8d1835d',
        firstName: 'Sam',
        lastName: 'Smith',
        email: 'sing@gmail.com',
        userRole: 'admin',
        password:
          '$2a$08$D0UoLEKFsKTBTb6FfEVy3OON3aGAYx0nttubrs97NnB744K9kAt3m',
      } as any;

      jest.spyOn(service, 'validateUser').mockImplementation(async () => user);

      jest.spyOn(service, 'login').mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await service.login(payload)).toEqual(result);
    });
  });
});
