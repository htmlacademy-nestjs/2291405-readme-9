import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';


@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule
  ]
})
export class AppModule {}
