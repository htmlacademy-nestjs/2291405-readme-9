import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './configurations/jwt.config';

const ENV_USERS_FILE_PATH = 'apps/account/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class AccountConfigModule {}
