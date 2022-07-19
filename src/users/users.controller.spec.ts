import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createAdmin: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      jest.spyOn(service, 'createAdmin').mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await controller.createAdmin(payload)).toEqual(result);
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

      jest.spyOn(service, 'createUser').mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await controller.createUser(payload)).toEqual(result);
    });
  });
});
