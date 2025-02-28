import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './teachers/teachers.module';
import { ErrorService } from './common/services/error.service';

@Module({
  imports: [TeachersModule],
  controllers: [AppController],
  providers: [AppService, ErrorService],
  exports: [ErrorService],
})
export class AppModule { }
