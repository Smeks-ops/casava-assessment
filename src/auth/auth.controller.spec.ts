import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      jest.spyOn(service, 'login').mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await controller.login(payload)).toEqual(result);
    });
  });
});
