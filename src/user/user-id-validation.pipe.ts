import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class UserIdValidationPipe implements PipeTransform {
    transform(value: any): string {
        const isValidUuid = validate(value);
        if (!isValidUuid) {
            throw new BadRequestException('Invalid ID');
        }
        return value;
    }
}
