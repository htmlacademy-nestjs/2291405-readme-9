import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { ChangePasswordUserDto } from '../dto/change-password-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { AuthenticationResponseMessage } from './authentication.constant';
import { AuthenticationResponse } from './authentication.response';
import { AuthenticationService } from './authentication.service';
import { RequestWithTokenPayload } from './request-with-token-payload';
import { RequestWithUser } from './request-with-user';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

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
  @UseGuards(LocalAuthGuard)
  public async login(
    @Body() dto: LoginUserDto,
    @Req() { user }: RequestWithUser,
  ) {
    user = await this.authService.verifyUser(dto);
    if (!user) {
      throw new NotFoundException(AuthenticationResponseMessage.UserNotFound);
    }

    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @Get(':id')
  @ApiResponse(AuthenticationResponse.UserFound)
  @ApiResponse(AuthenticationResponse.UserNotFound)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @Post('change-password')
  @ApiResponse(AuthenticationResponse.PasswordUpdated)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  public async updatePassword(@Body() dto: ChangePasswordUserDto) {
    await this.authService.updatePassword(dto);
  }

  @Post('refresh')
  @ApiResponse(AuthenticationResponse.GetToken)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiBearerAuth('refreshToken')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @Post('check')
  @ApiResponse(AuthenticationResponse.CheckSuccess)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
