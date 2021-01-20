import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import * as util from 'util';

@Provide()
export class AccessMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const start = new Date().getTime();

      await next();

      const rs = Math.ceil(new Date().getTime() - start);

      ctx.set('X-Response-Time', rs + '');

      const host = ctx.get('host');
      const ip = ctx.get('X-Real-IP') || ctx.ip;
      const port = ctx.get('X-Real-Port') || '-';
      const protocol = ctx.protocol.toUpperCase();
      const method = ctx.method;
      const url = ctx.url;
      const status = ctx.status;
      const length = ctx.length || '-';
      const referrer = ctx.get('referrer') || '-';
      const ua = ctx.get('user-agent') || '-';
      const serverTime = ctx.response.get('X-Server-Response-Time') || '-';
      const message = util.format(
        '[access] %s:%s - %s %s %s %s/%s %s %s %s %s %s',
        ip,
        port,
        method,
        host,
        url,
        protocol,
        status,
        length,
        referrer,
        rs,
        serverTime,
        ua
      );
      const logger = ctx.getLogger('accessLogger') || ctx.logger;
      logger.info(message);
    };
  }
}

