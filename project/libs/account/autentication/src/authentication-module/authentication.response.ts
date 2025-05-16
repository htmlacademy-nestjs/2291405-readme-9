import { HttpStatus } from '@nestjs/common';

import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';


export const AuthenticationResponse = {
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  },
  LoggedSuccess: {
    type: LoggedUserRdo,
    status: HttpStatus.CREATED,
    description: 'User has been successfully logged',
  },
  LoggedError: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong',
  },
  UserFound: {
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  },
  UserNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  },
  UserExist: {
    status: HttpStatus.CONFLICT,
    description: 'User with the email already exists',
  },
  UserCreated: {
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created',
  },
  PasswordUpdated: {
    status: HttpStatus.CREATED,
    description: 'The user password has been successfully updated',
  },
  UserNotAuth: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized',
  },
  UserAuthForbidden: {
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden for authorized users',
  },
} as const;
