import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { PromocodesService } from './promocodes.service';

@Controller('promocodes')
export class PromocodesController {
    constructor(private readonly promocodesService: PromocodesService) {}

    @Get('validate')
    validatePromocode(@Query('code') code: string) {
        return this.promocodesService.validatePromocode(code);
    }
}
