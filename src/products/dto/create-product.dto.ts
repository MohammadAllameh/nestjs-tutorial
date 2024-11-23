import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional,
    MinLength,
} from 'class-validator';
import userGuard from 'src/users/dto/userGuard.dto';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Product title',
        minimum: 5,
        maximum: 50,
        example: 'This is one product',
        default: '',
    })
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @ApiProperty({
        description: 'Product Description',
        minimum: 20,
        maximum: 1500,
        example:
            'lourem ipustsl;fkj ;slkjf sl;kfj ;lsadkjf l;sakjdf ;lkjsa;l kjdf;jka; ',
        default: '',
    })
    readonly description: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'Product Price',
        minimum: 0,
        maximum: 100000,
        example: 2500,
        default: 0,
    })
    readonly price: number;

    @ApiProperty({
        description: 'this of the list user',
        type: 'array',
        items: { type: 'string' },
    })
    readonly users: number;

    @ApiProperty({
        description: 'this of list type ',
        enum: ['ali', 'mohammad', 'kosar'],
    })
    readonly types: string;

    @IsOptional()
    user: userGuard;
}
