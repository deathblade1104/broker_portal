// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
// import { Response } from 'express';
// import { ZodError, ZodIssue } from 'zod';

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {

//   private isError(obj: any): obj is Error {
//     return obj instanceof Error && typeof obj.message !== undefined;
//   }

//   private isZodError(error: any): error is ZodError {
//     if (error && typeof error === 'object' && 'issues' in error && 'name' in error) {
//       return error.name === 'ZodError';
//     }
//     return false;
//   }

//   private getMessage(message : string | Record<string,any>){
//     if(typeof message  === "string")
//       return message;
//     return JSON.stringify(message);
//   }

//   private formatZodErrors(errors: ZodIssue[]): string {
//     return errors.map(error => (
//       `Issue - ${error.code}, for field(s) - ${error.path.join('.')}, error - ${error.message}`
//     )).join(', ');
//   }

//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     let status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
//     const message = this.isError(exception) ? this.getMessage(exception.message) : 'Internal server error';
//     const responseBody = {
//       success : false,
//       message
//     }
//     if (this.isZodError(exception)) {
//       status = HttpStatus.BAD_REQUEST;
//       responseBody.message  = this.formatZodErrors(exception.issues);
//     }
//     responseBody['statusCode'] = status;
//     Logger.error(`Exception caught in GlobalExceptionFilter: ${JSON.stringify(exception)}`)
//     response.status(status).json(responseBody);
//   }
// }
