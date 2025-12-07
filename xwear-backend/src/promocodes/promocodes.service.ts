import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PromocodesService {
    constructor(private readonly prisma: PrismaService) { }

    async validatePromocode(code: string) {
        const promocode = await this.prisma.promocode.findUnique({
            where: { code, expiresAt: { gt: new Date() } },
        });

        if (promocode) {
            return { valid: true, discount: promocode.discount, id: promocode.id };
        } else {
            return { valid: false, discount: 0 };
        }
    }
}
