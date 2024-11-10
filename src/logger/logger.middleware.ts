import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
// import { FastifyRequest, FastifyReply } from 'fastify';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');
    use(req: Request, res: Response, next: () => void) {
        // ExpressJS

        // use(req: FastifyRequest, res: FastifyReply, next: () => void) { // FastifyJS
        ////////// FastifyJS
        // const { method, url: baseUrl, ip } = req;
        // const userAgent = req.headers['user-agent'] || '';
        // const startAt = process.hrtime();
        // res.raw.prependOnceListener('finish', () => {
        //   const { statusCode } = res;
        //   const contentLength = res.getHeader('content-length');
        //   const dif = process.hrtime(startAt);
        //   const responseTime = dif[0] * 1e3 + dif[1] * 1e-6;

        //   this.logger.log(`
        //     ${method} ${baseUrl} ${statusCode} ${contentLength} -
        //     ${responseTime.toFixed(3)}ms
        //     ${ip}
        //     ${userAgent}
        //   `);
        // });
        ////////// ExpressJS
        const { method, baseUrl, ip } = req;
        const userAgent = req.get('user-agent') || '';
        const startAt = process.hrtime();
        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            const dif = process.hrtime(startAt);
            const responseTime = dif[0] * 1e3 + dif[1] * 1e-6;
            this.logger.log(`q
        ${method} ${baseUrl} ${statusCode} ${contentLength} 
        ${responseTime.toFixed(3)}ms
        ${userAgent} ${ip}
        `);
        });
        next();
    }
}
