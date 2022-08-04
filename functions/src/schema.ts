/* eslint-disable linebreak-style */
import {z} from 'zod';

export const accountStatusSchema = z.object({
  version: z.union([z.literal('full'), z.literal('show'), z.literal('trial')]),
  creationDate: z.date(),
  licenseDate: z.date(),
  trialEnd: z.date(),
  paymentType: z.union([z.literal('anual'), z.literal('mensual')]),
  mensualPayment: z.number(),
  anualPayment: z.number(),
});

export const pricingConfigurationSchema = z.object({
  anualPayment: z.number(),
  mensualPayment: z.number(),
  trialDuration: z.number(),
});

export const slugSchema = z.object({
  name: z.string(),
  localId: z.string(),
});

export const categorySchema = z.object({
  name: z.string(),
  available: z.boolean(),
  display: z.boolean(),
  index: z.number(),
  extras: z.array(z.string()),
  slug: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
});

export const categoryToCreateSchema = categorySchema.omit({slug: true});

export const extraSchema = z.object({
  name: z.string(),
  available: z.boolean(),
  price: z.number(),
});

export const localTypeSchema = z.union([
  z.literal('store'),
  z.literal('restaurant'),
]);

export const currencySchema = z.union([
  z.literal('USD'),
  z.literal('PEN'),
  z.literal('COP'),
]);

export const socialNetworksSchema = z.object({
  facebookLink: z.string().optional(),
  tiktokLink: z.string().optional(),
  instagramLink: z.string().optional(),
});

const deliveryPriceFixedSchema = z.number();

export const geoPointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const restrictionByCountrySchema = z.object({
  type: z.literal('country'),
});

export const restrictionByCitySchema = z.object({
  type: z.literal('city'),
});

export const restrictionByProvinceSchema = z.object({
  type: z.literal('state'),
});

export const restrictionBySiteSchema = z.object({
  type: z.literal('site'),
  geoMidpoint: geoPointSchema,
  geoRadius: z.number(),
});

export const localLocalizationTypeSchema = z.union([
  z.literal('UbicationRequired'),
  z.literal('UbicationNotRequired'),
]);

export const restrictionTypeSchema = z.union([
  z.literal('state'),
  z.literal('site'),
  z.literal('city'),
  z.literal('country'),
]);

export const sectionTypesSchema = z.union([
  z.literal('description'),
  z.literal('image'),
  z.literal('gallery'),
  z.literal('location'),
]);

const containterSizeSchema = z.object({
  size: z.union([z.literal(6), z.literal(12)]),
});

export const descriptionSectionSchema = z
    .object({
      type: z.literal('description'),
      title: z.string(),
      description: z.string(),
    })
    .and(containterSizeSchema);

export const imageSectionSchema = z
    .object({
      type: z.literal('image'),
      title: z.string().optional(),
      images: z.array(
          z.object({
            title: z.string(),
            description: z.string().optional(),
            imageUrl: z.string().optional(),
          })
      ),
      gap: z.number().optional(),
      gapMobile: z.number().optional(),
      gapTablet: z.number().optional(),
      col: z.number().optional(),
      colMobile: z.number().optional(),
      colTablet: z.number().optional(),
    })
    .and(containterSizeSchema);

export const gallerySectionSchema = z
    .object({
      type: z.literal('gallery'),
      title: z.string().optional(),
      images: z.array(
          z.object({
            imageUrl: z.string().optional(),
          })
      ),
      gap: z.number().optional(),
      gapMobile: z.number().optional(),
      gapTablet: z.number().optional(),
      col: z.number().optional(),
      colMobile: z.number().optional(),
      colTablet: z.number().optional(),
    })
    .and(containterSizeSchema);

export const locationSectionSchema = z
    .object({
      type: z.literal('location'),
      title: z.string(),
    })
    .and(containterSizeSchema);

export const dayOfWeekSchema = z.union([
  z.literal('Monday'),
  z.literal('Tuesday'),
  z.literal('Wednesday'),
  z.literal('Thursday'),
  z.literal('Friday'),
  z.literal('Saturday'),
  z.literal('Sunday'),
]);

export const managerSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  displayName: z.string(),
  imageUrl: z.string().optional(),
});

export const deliveryInformationSchema = z.object({
  isDelivery: z.literal(true),
  accepted: z.boolean(),
  acceptedTime: z.number(),
  expectedTime: z.number(),
  deliveryPrice: z.number(),
  referenciaDireccion: z.string(),
});

export const notDeliveryInformationSchema = z.object({
  isDelivery: z.literal(false),
});

export const notInvoiceInformationSchema = z.object({
  factura: z.literal(false),
});

export const discountInformationSchema = z.object({
  referralCode: z.string(),
  totalDescuento: z.number(),
});

export const notDiscountInformationSchema = z.object({
  totalDescuento: z.literal(0),
});

export const creationOrderDeviceSchema = z.object({
  type: z.union([
    z.literal('client'),
    z.literal('admin'),
    z.literal('employee'),
  ]),
  id: z.string(),
});

export const invoiceClientInformationSchema = z.object({
  tipoIdentificacionComprador: z.string(),
  identificacionComprador: z.string(),
});

export const clientInformationSchema = z.object({
  nombres: z.string(),
  apellidos: z.string(),
  correo: z.string(),
  telefono: z.string(),
  direccion: z.string(),
});

export const deliveryFieldsSchema = z.object({
  deliveryPrice: z.number(),
  referenciaDireccion: z.string(),
});

export const canceledStateSchema = z.object({
  canceled: z.literal(true),
  canceledReason: z.string(),
  canceledTime: z.number(),
});

export const notCanceledStateSchema = z.object({
  canceled: z.literal(false),
});

export const restaurantStateBaseSchema = z.object({
  notPaid: z.number(),
  ready: z.boolean(),
  readyTime: z.number(),
  done: z.boolean(),
  doneTime: z.number(),
  paid: z.boolean(),
  paidTime: z.number(),
  serve: z.boolean(),
  serveTime: z.number(),
});

export const restaurantStateSchema = z.union([
  restaurantStateBaseSchema.and(notCanceledStateSchema),
  restaurantStateBaseSchema.and(canceledStateSchema),
]);

export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  impuesto: z.any(),
  specification: z.string(),
  extras: z.array(extraSchema),
  categoryId: z.string(),
  toTake: z.boolean(),
  extrasPrice: z.number(),
  ready: z.boolean(),
  paid: z.boolean(),
  serve: z.boolean(),
  containerCost: z.number(),
});

export const restaurantAditionalFieldsSchema = z.object({
  propina: z.number().optional(),
  table: z.string().optional(),
  tableStr: z.string().optional(),
});

export const extrasStateSchema = z.array(
    z.object({
      extraId: z.string(),
      quantity: z.number(),
    })
);

export const variantsStateSchema = z.array(
    z.object({
      variantId: z.string(),
      selectionId: z.string(),
    })
);

export const estimatedTimeSchema = z.object({
  type: z.union([z.literal('min'), z.literal('hour'), z.literal('day')]),
  number: z.number(),
});

export const variantItemSchema = z.object({
  id: z.string(),
  price: z.number().optional(),
});

export const variantSchema = z.object({
  id: z.string(),
  items: z.array(variantItemSchema),
});

export const idSchema = z.object({
  id: z.string(),
});

export const managerInputTypeSchema = managerSchema.omit({
  imageUrl: true,
  displayName: true,
});

export const loginSchema = z.object({
  mail: z.string(),
  password: z.string(),
  validation: z.boolean(),
});

export const categoryToUpdateSchema = categorySchema
    .omit({slug: true})
    .and(idSchema);

export const localUbicationNeededSchema = z.object({
  type: z.literal('UbicationRequired'),
  geo: geoPointSchema,
  address: z.string(),
  restriction: z
      .union([
        restrictionByCountrySchema,
        restrictionBySiteSchema,
        restrictionByProvinceSchema,
        restrictionByCitySchema,
      ])
      .optional(),
});

export const localUbicationNotNeededSchema = z.object({
  type: z.literal('UbicationNotRequired'),
  restriction: z
      .union([
        restrictionByCountrySchema,
        restrictionByProvinceSchema,
        restrictionByCitySchema,
      ])
      .optional(),
});

export const sectionPageSchema = z.union([
  descriptionSectionSchema,
  imageSectionSchema,
  gallerySectionSchema,
  locationSectionSchema,
]);

export const workDaySchema = z.object({
  time: z.array(
      z.object({
        open: z.string(),
        close: z.string(),
      })
  ),
  daysOfWeek: z.array(dayOfWeekSchema),
  active: z.boolean(),
});

export const invoiceInformationSchema = z
    .object({
      factura: z.literal(true),
    })
    .and(invoiceClientInformationSchema);

export const orderToInvoiceSchema = z.object({
  id: z.string(),
  code: z.string(),
  date: z.string(),
  clientId: z.string(),
  client: z.object({
    nombres: z.string(),
    apellidos: z.string(),
    correo: z.string(),
    telefono: z.string(),
    direccion: z.string(),
    referenciaDireccion: z.string(),
    tipoIdentificacionComprador: z.string(),
    razonSocialComprador: z.string(),
    identificacionComprador: z.string(),
    direccionComprador: z.string(),
  }),
  factura: z.boolean(),
  formaPago: z.string(),
  factData: z.any(),
  direccion: z.string(),
  referenciaDireccion: z.string(),
  items: z.array(itemSchema),
  totalSinImpuestos: z.number(),
  totalDescuento: z.number(),
  totalConImpuestos: z
      .object({
        totalImpuesto: z.object({
          codigo: z.string(),
          codigPorcentaje: z.string(),
          baseImponible: z.string(),
          tarifa: z.string(),
          valor: z.string(),
        }),
      })
      .optional(),
  propina: z.number().optional(),
  importeTotal: z.number(),
  moneda: z.literal('DOLAR'),
  pagos: z
      .object({
        pago: z.object({
          formaPago: z.string(),
          total: z.number(),
          plazo: z.number(),
          unidadTiempo: z.number(),
        }),
      })
      .optional(),
  table: z.string(),
  tableStr: z.string(),
  notPaid: z.number(),
  ready: z.boolean(),
  readyTime: z.any(),
  done: z.boolean(),
  doneTime: z.any(),
  paid: z.boolean(),
  paidTime: z.any(),
  serve: z.boolean(),
  serveTime: z.any(),
  canceled: z.boolean(),
  canceledReason: z.string(),
  canceledTime: z.any(),
  deliveryPrice: z.number(),
  accepted: z.boolean(),
  acceptedTime: z.any(),
  expectedTime: z.number(),
  waitress: z.string(),
  waitressId: z.string(),
});

export const shoppingCartItemSchema = z.object({
  productId: z.string(),
  variants: variantsStateSchema,
  quantity: z.number(),
  extras: extrasStateSchema,
  specification: z.string().optional(),
});

export const shoppingCartSchema = z.object({
  items: z.array(shoppingCartItemSchema),
});

export const productSchema = z.object({
  name: z.string(),
  available: z.boolean(),
  display: z.boolean(),
  description: z.string(),
  slug: z.string(),
  price: z.number().min(0),
  estimatatedTime: estimatedTimeSchema.optional(),
  index: z.number(),
  category: z.string(),
  variants: z.array(variantSchema).optional(),
  imageUrl: z.string().optional(),
});

export const productFilledSchema = productSchema
    .and(
        z.object({
          extras: z.array(extraSchema.and(idSchema)),
        })
    )
    .and(idSchema);

export const productToCreateSchema = productSchema.omit({slug: true});

export const productToUpdateSchema = productSchema
    .omit({slug: true})
    .and(idSchema);

export const localLocalizationSchema = z.union([
  localUbicationNeededSchema,
  localUbicationNotNeededSchema,
]);

export const pageConfigurationSchema = z.object({
  primaryColor: z.string().optional(),
  presentationImage: z.string().optional(),
  sections: z.array(sectionPageSchema),
});

export const orderFromClientSchema = z.object({
  cart: shoppingCartSchema,
  formaPago: z.string(),
  client: clientInformationSchema,
  creationDeviceId: creationOrderDeviceSchema,
  referralCode: z.string().optional(),
  invoice: invoiceClientInformationSchema.optional(),
  delivery: deliveryFieldsSchema.optional(),
});

export const shoppingCartItemFilledSchema = z.object({
  product: productFilledSchema,
  variants: z.array(
      z.object({
        price: z.number(),
        variantId: z.string(),
        selectionId: z.string(),
      })
  ),
  quantity: z.number(),
  extras: z.array(
      z.object({
        extraId: z.string(),
        quantity: z.number(),
        name: z.string(),
        price: z.number(),
      })
  ),
});

export const shoppingCartFilledSchema = z.object({
  items: z.array(shoppingCartItemFilledSchema),
});

export const localSchema = z.object({
  active: z.boolean(),
  schedule: z.array(workDaySchema),
  deliveryPrice: deliveryPriceFixedSchema.min(0),
  name: z.string().min(2),
  contactNumber: z.string().min(10),
  country: z.string(),
  state: z.string(),
  city: z.string().min(2),
  description: z.string().max(155),
  aboutMe: z.string().max(155),
  type: localTypeSchema,
  currency: currencySchema,
  localConfiguration: pageConfigurationSchema,
  slug: z.string(),
  localization: localLocalizationSchema.optional(),
  logo: z.string().optional(),
  localCustomUrl: z.string().optional(),
  socialNetworks: socialNetworksSchema.optional(),
  email: z.string().email().optional(),
});

export const localToCreateSchema = localSchema.omit({slug: true});

export const localToUpdateSchema = localSchema.partial().omit({slug: true});

export const orderBaseSchema = z.object({
  date: z.date(),
  items: shoppingCartFilledSchema,
  client: clientInformationSchema,
  orderNumber: z.number(),
  creationDeviceId: creationOrderDeviceSchema,
  formaPago: z.string(),
  totalSinImpuestos: z.number(),
  currency: currencySchema,
  totalConImpuestos: z.object({
    totalImpuesto: z.object({
      codigo: z.string(),
      codigoPorcentaje: z.string(),
      baseImponible: z.string(),
      tarifa: z.string(),
      valor: z.string(),
    }),
  }),
  pagos: z.object({
    pago: z.object({
      formaPago: z.string(),
      total: z.number(),
      plazo: z.number(),
      unidadTiempo: z.number(),
    }),
  }),
});

export const orderWithDiscountSchema = orderBaseSchema.and(
    discountInformationSchema
);

export const orderWithOutDiscountSchema = orderBaseSchema.and(
    notDiscountInformationSchema
);

export const deliveryOrderSchema = z.union([
  deliveryInformationSchema.and(orderWithDiscountSchema),
  deliveryInformationSchema.and(orderWithOutDiscountSchema),
]);

export const notDeliveryOrderSchema = z.union([
  notDeliveryInformationSchema.and(orderWithDiscountSchema),
  notDeliveryInformationSchema.and(orderWithOutDiscountSchema),
]);

export const orderWithInvoiceSchema = z.union([
  deliveryOrderSchema.and(invoiceInformationSchema),
  notDeliveryOrderSchema.and(invoiceInformationSchema),
]);

export const orderWithOutInvoiceSchema = z.union([
  deliveryOrderSchema.and(notInvoiceInformationSchema),
  notDeliveryOrderSchema.and(notInvoiceInformationSchema),
]);

export const orderSchema = z.union([
  orderWithInvoiceSchema,
  orderWithOutInvoiceSchema,
]);

export const restaurantOrderSchema = orderSchema
    .and(restaurantAditionalFieldsSchema)
    .and(restaurantStateBaseSchema);

export const localInputTypeSchema = localSchema.omit({
  active: true,
  schedule: true,
  deliveryPrice: true,
  description: true,
  aboutMe: true,
  currency: true,
  localization: true,
  logo: true,
  slug: true,
  localCustomUrl: true,
  localConfiguration: true,
  socialNetworks: true,
  email: true,
});

export const localCreationInputTypeSchema = z.object({
  manager: managerInputTypeSchema,
  local: localInputTypeSchema,
  password: z.string(),
});

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === 'undefined') {
      return {message: 'Este campo es requerido'};
    }

    return {message: 'El tipo de datos no es válido'};
  }
  // if (issue.code === z.ZodIssueCode.custom) {
  //   return { message: `less-than-${(issue.params || {}).minimum}` }
  // }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === 'email') return {message: 'El email es inválido'};
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'number') {
      return {message: `El valor mínimo es ${issue.minimum}`};
    }
    if (issue.type === 'string') {
      return {message: `Debe tener como mínimo ${issue.minimum} caracteres`};
    }
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'number') {
      return {message: `El valor máximo es ${issue.maximum}`};
    }
    if (issue.type === 'string') {
      return {message: `Debe tener como máximo ${issue.maximum} caracteres`};
    }
  }
  return {message: ctx.defaultError};
};

z.setErrorMap(customErrorMap);
