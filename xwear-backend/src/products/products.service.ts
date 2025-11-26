import {Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';

const ALLOWED_CATEGORIES = {
    'mens-shirts': 'clothes',
    'mens-shoes': 'shoes',
    'mens-watches': 'accessories',
    sunglasses: 'accessories',
    'womens-dresses': 'clothes',
    'womens-jewellery': 'accessories',
    'womens-shoes': 'shoes',
    'womens-watches': 'accessories',
};

const RANDOM_COLLECTIONS = [
    'Evolve Nature',
    'Modern Pulse',
    'Beyond Limits',
    'Silhouette Harmony',
    'Freedom Motion',
    'Timeless Spirit',
];

const RANDOM_MODELS = [
    'Trail Max',
    'Solar Edge',
    'Titan Loop',
    'Ultra Shade',
    'Winter Glow',
    'Nature Grip',
    'Peak Motion',
    'Calm Flow',
    'Urban Ease',
    'RainGuard X',
    'Cloud Walk',
    'Chic Apex',
];

const RANDOM_COLORS = [
    'Black',
    'White',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Pink',
    'Purple',
    'Orange',
    'Gray',
    'Brown',
];

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {
        // this.seedData();
    }

    async findAll(filter: {
        category?: string;
        collection?: string;
        model?: string;
        color?: string;
        minPrice?: string;
        maxPrice?: string;
    }) {
        return this.prisma.product.findMany({
            where: {
                category: {
                    contains: filter.category || undefined,
                    mode: 'insensitive',
                },
                collection: {
                    contains: filter.collection || undefined,
                    mode: 'insensitive',
                },
                model: {
                    contains: filter.model || undefined,
                    mode: 'insensitive',
                },
                color: {
                    contains: filter.color || undefined,
                    mode: 'insensitive',
                },
                price: {
                    gte: filter.minPrice ? parseFloat(filter.minPrice) : undefined,
                    lte: filter.maxPrice ? parseFloat(filter.maxPrice) : undefined,
                },
            },
            orderBy: {
                id: 'asc',
            },
        });
    }

    async seedData() {
        const products = await fetch('https://dummyjson.com/products?limit=194');
        const data = await products.json();

        data.products.forEach(async (product) => {
            if (!ALLOWED_CATEGORIES[product.category]) {
                return;
            }
            product.category = ALLOWED_CATEGORIES[product.category];

            const sizes = [37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44];

            await this.prisma.product.create({
                data: {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    collection:
                        RANDOM_COLLECTIONS[
                            Math.floor(Math.random() * RANDOM_COLLECTIONS.length)
                            ],
                    model:
                        RANDOM_MODELS[Math.floor(Math.random() * RANDOM_MODELS.length)],
                    color:
                        RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)],
                    images: product.images || [],
                },
            });

            for (let i = 0; i <= Math.floor(Math.random() * sizes.length); i++) {
                await this.prisma.productSize.create({
                    data: {
                        price: Math.floor(product.price) + (i * 10) + 0.99,
                        size: `${sizes[i]}`,
                        productId: product.id,
                    }
                })
            }
        });

        return 'OK';
    }

    async findOne(id: number) {
        return await this.prisma.product.findUnique({
            where: {id},
            include: {
                reviews: {include: {user: {select: {id: true, firstName: true, lastName: true}}}},
                productSizes: true
            },
        });
    }
}
