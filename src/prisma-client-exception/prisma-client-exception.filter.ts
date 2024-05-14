import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionKnownRequestFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}

@Catch(Prisma.PrismaClientValidationError)
export class PrismaClientExceptionValidationBirthFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
    console.error(exception.message);
    if (exception.message.search(/Expected ISO-8601 DateTime./) !== -1) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      return response.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: ['birth must be a valid ISO 8601 date string'],
      });
    }

    super.catch(exception, host);
  }
}
