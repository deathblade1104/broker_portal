import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomResponseBodyType } from '../providers/customResponse';

@Injectable()
export class ResponseInterceptor<
  T = Record<string, any> | Array<Record<string, any>>,
> implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: CustomResponseBodyType<T>) =>
        this.responseHandler(res, context),
      ),
      catchError((err: any) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(error: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = 500;
    let message = 'Internal Server Error';

    if (error instanceof HttpException) {
      statusCode = error.getStatus();
      message = error.message || 'Http Exception';
    } else if (error.response && error.response.statusCode) {
      statusCode = error.response.statusCode;
      message = error.message || 'Database Error';
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      path: request.url,
      message,
      error: error.stack || error,
    });
  }

  responseHandler(res: CustomResponseBodyType<T>, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = response.statusCode || 200; // Default to 200 if status code is not set

    return {
      success: true,
      path: request.url,
      statusCode,
      message: res.message || 'Operation completed successfully',
      data: res.data,
    };
  }
}
