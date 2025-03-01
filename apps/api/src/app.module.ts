import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './teachers/teachers.module';
import { RestApiService } from './common/services/restapi.service';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [TeachersModule, ClassesModule],
  controllers: [AppController],
  providers: [AppService, RestApiService],
  exports: [RestApiService],
})
export class AppModule { }
