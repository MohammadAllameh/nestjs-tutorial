import { MiddlewareConsumer, Module, NestModule, Query } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AiModule } from './ai/ai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import UsersEntity from './entities/user.entity';
import {
    AcceptLanguageResolver,
    HeaderResolver,
    I18nModule,
    QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_SERVER_HOST,
                port: +process.env.EMAIL_SERVER_PORT,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
            defaults: {
                from: `welcom to <${process.env.EMAIL_USERNAME}>`,
            },
            template: {
                // dir: __dirname + '/templates',
                dir: process.cwd() + '/templates/',
                adapter: new EjsAdapter(),
                options: {
                    strict: true,
                    // debug: true
                },
            },
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                // path: path.join(__dirname, '/i18n/'
                path: path.join(__dirname, '/i18n/'),
                watch: true,
            }, //iran
            resolvers: [
                new AcceptLanguageResolver(), // main
                new QueryResolver(['lang']),
                new HeaderResolver(['x-custom-lang']),
            ],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'MohammadPostgresql2009$',
            database: 'nestjs-tutorial',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([UsersEntity]),
        UsersModule,
        ProductsModule,
        AiModule,
        AuthModule,
    ],
    exports: [TypeOrmModule.forFeature([UsersEntity])],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
