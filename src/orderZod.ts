import { generateMock } from '@anatine/zod-mock';
import z  from 'zod';

const schema = z.object({
      date: z.date(),
      items: z.number().min(11).max(40),
      total: z.number().min(18).max(120),
      subtotal: z.number().min(18).max(120),
      client: z.string().nonempty(),
      referralCode : z.string().nonempty(),
      factura: z.boolean(),
      formaPago: z.enum([`light`, `dark`]),
      totalSinImpuestos: z.number().min(18).max(120),
      totalDescuento: z.number().min(18).max(120),
      currency: z.enum([`USD`, `BTC`, `ETH`])
      
    });

// console.log(generateMock(schema));
export const mockData = generateMock(schema);

