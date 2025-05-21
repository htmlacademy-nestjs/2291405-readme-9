import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/helpers';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { AuthenticationResponse } from './authentication.response';
import { ChangePasswordUserDto } from '../dto/change-password-user.dto';


@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @Post('register')
  @ApiResponse(AuthenticationResponse.UserCreated)
  @ApiResponse(AuthenticationResponse.UserExist)
  @ApiResponse(AuthenticationResponse.BadRequest)
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(LoggedUserRdo, newUser.toPOJO());
  }

  @Post('login')
  @ApiResponse(AuthenticationResponse.LoggedSuccess)
  @ApiResponse(AuthenticationResponse.LoggedError)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @ApiResponse(AuthenticationResponse.UserNotFound)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDto(LoggedUserRdo, verifiedUser.toPOJO());
  }

  @Get(':id')
  @ApiResponse(AuthenticationResponse.UserFound)
  @ApiResponse(AuthenticationResponse.UserNotFound)
  @ApiResponse(AuthenticationResponse.BadRequest)
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @Post('change-password')
  @ApiResponse(AuthenticationResponse.PasswordUpdated)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiResponse(AuthenticationResponse.BadRequest)
  public async updatePassword(
    @Body() dto: ChangePasswordUserDto
  ) {
    await this.authService.updatePassword(dto);
  }
}
