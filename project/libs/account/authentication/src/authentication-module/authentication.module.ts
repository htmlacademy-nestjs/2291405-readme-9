import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BlogUserModule } from '@project/blog-user';
import { getJwtOptions } from '@project/config';
import { PrismaClientModule } from '@project/model';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    BlogUserModule,
    PrismaClientModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthenticationModule {}
