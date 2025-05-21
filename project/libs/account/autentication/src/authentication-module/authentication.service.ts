
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { AuthUser} from '@project/core';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG
} from './authentication.constant';
import { AuthenticationResponse } from './authentication.response';
import { ChangePasswordUserDto } from 'src/dto/change-password-user.dto';

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const {
      name,
      email,
      avatar,
      password
    } = dto;

    const blogUser: AuthUser = {
      name,
      email,
      avatar,
      passwordHash: '',
      postCount: 0,
      subscriberCount: 0,
      registerDate: new Date()
    };

    if (await this.blogUserRepository.findByEmail(email)) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password)
    this.blogUserRepository.save(userEntity);

    return userEntity;
  }

    public async updatePassword(dto: ChangePasswordUserDto) {
    if (!dto.id) {
      throw new UnauthorizedException(
        AuthenticationResponse.UserNotAuth.description
      );
    }
    const existUser = await this.blogUserRepository.findById(dto.id);
    if (!existUser) {
      throw new NotFoundException(
        AuthenticationResponse.UserNotFound.description
      );
    }
    const login: LoginUserDto = {
      email: existUser.email,
      password: dto.oldPassword,
    };
    if (await this.verifyUser(login)) {
      const userEntity = await existUser.setPassword(dto.newPassword);
      this.blogUserRepository.update(userEntity);
    }
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (! user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }
}
