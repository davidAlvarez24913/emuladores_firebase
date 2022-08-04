/* eslint-disable max-len */
import * as functions from 'firebase-functions';
// libreria para el cliente
import * as firebaseAdmin from 'firebase-admin';
import 'firebase-functions';
import {generateMock} from '@anatine/zod-mock';
import {z} from 'zod';
import {orderBaseSchema} from './schema';

firebaseAdmin.initializeApp();
const db = firebaseAdmin.firestore();
db.settings({
  timestampsInSnapshots: true,
});

const schema = z.object({
  id: z.number().min(11).max(40),
  date: z.date(),
  items: z.number().min(11).max(40),
  total: z.number().min(18).max(120),
  subtotal: z.number().min(18).max(120),
  client: z.string().nonempty(),
  referralCode: z.string().nonempty(),
  factura: z.boolean(),
  formaPago: z.enum(['light', 'dark']),
  totalSinImpuestos: z.number().min(18).max(120),
  totalDescuento: z.number().min(18).max(120),
  currency: z.enum(['USD', 'BTC', 'ETH']),

});

// console.log(generateMock(schema));
const mockData = generateMock(schema);
const order = generateMock(orderBaseSchema);
const orderOK = {
  date: order.date,
  client: order.client,
  orderNumber: order.orderNumber,
  creationDeviceId: order.creationDeviceId,
  formaPago: order.formaPago,
  totalSinImpuestos: order.totalSinImpuestos,
  currency: order.currency,
  totalConImpuestos: order.totalConImpuestos,
  pagos: order.pagos,
};


export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});


export const writeOrder = functions.https.onRequest((req, res)=> {
  db.doc(`orders/${mockData.id}`).create({
    date: order.date,
    // items: order.items.items,
    client: order.client,
    orderNumber: order.orderNumber,
    creationDeviceId: order.creationDeviceId,
    formaPago: order.formaPago,
    totalSinImpuestos: order.totalSinImpuestos,
    currency: order.currency,
    totalConImpuestos: order.totalConImpuestos,
    pagos: order.pagos,

  });
  console.log('Orden agregada');
  res.send(200);
});
// db.batch()
// añadir al batch

export const readOrder = functions.https.onRequest((req, res)=> {
  // se debe pasar id del registro que se desea leer
  const {id} = req.body;
  const docRef = db.doc(`orders/${id}`);
  docRef.get().then(function(doc) {
    if (doc.exists) {
      const data = doc.data();
      console.log(data);
    } else {
      console.log('No existe id de la orden');
    }
  });

  console.log('Orden leida');
  res.send(200);
});
export const deleteOrder = functions.https.onRequest((req, res)=> {
  const {id} = req.body;
  db.doc(`orders/${id}`).delete();
  // verificar que el id de la orden existe
  console.log('Orden eliminada');
  res.send(200);
});


const batch = db.batch();

export const newPopulate = functions.https.onRequest((req, res) => {
  const docRef = db.doc(`orders/${orderOK.orderNumber}`);
  batch.create(docRef, orderOK);
  batch.commit();
  res.send('Hello from Firebase!');
});
