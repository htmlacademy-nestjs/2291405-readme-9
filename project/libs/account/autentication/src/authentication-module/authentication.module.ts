import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/blog-user';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PrismaClientModule } from '@project/model';


@Module({
  imports: [
    BlogUserModule,
    PrismaClientModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule {}
