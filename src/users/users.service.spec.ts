import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAdmin', () => {
    it('should create an admin and return a token', async () => {
      const result = {
        access_token: 'eyJhbGciOiJIUzI',
      };

      const payload = {
        firstName: 'test',
        lastName: 'test',
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
        // createdAt: 2022-02-16T10:40:38.688Z,
        // updatedAt: 2022-02-16T10:40:38.688Z
      } as any;

      jest.spyOn(service, 'findByEmail').mockImplementation(async () => user);

      jest.spyOn(service, 'createAdmin').mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await service.createAdmin(payload)).toEqual(result);
    });
  });

  describe('createUser', () => {
    it('should create a user and return a token', async () => {
      const result = {
        access_token: 'eyJhbGciOiJIUzI',
      };

      const payload = {
        firstName: 'test',
        lastName: 'test',
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
        // createdAt: 2022-02-16T10:40:38.688Z,
        // updatedAt: 2022-02-16T10:40:38.688Z
      } as any;

      jest.spyOn(service, 'findByEmail').mockImplementation(async () => user);

      jest.spyOn(service, 'createUser').mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await service.createUser(payload)).toEqual(result);
    });
  });
});
