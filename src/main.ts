import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';

import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// add type For Test
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    app.use(
        session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    const config = new DocumentBuilder()
        .setTitle('My products site')
        .setDescription('This is Products api documentation')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
    // const app = await NestFactory.create<NestFastifyApplication>(
    //   AppModule,
    //   new FastifyAdapter()
    // );
    // await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
