/* eslint-disable max-len */
import * as functions from 'firebase-functions';
// libreria para el cliente
import * as firebaseAdmin from 'firebase-admin';
import 'firebase-functions';
import {generateMock} from '@anatine/zod-mock';
import {orderBaseSchema} from './schema';

firebaseAdmin.initializeApp();
const db = firebaseAdmin.firestore();

db.settings({
  timestampsInSnapshots: true,
  ignoreUndefinedProperties: true,
});
const batch = db.batch();
const order = generateMock(orderBaseSchema);

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});


export const writeOrder = functions.https.onRequest((req, res)=> {
  db.doc(`orders/${order.orderNumber}`).create(order);
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


export const newPopulate = functions.https.onRequest((req, res) => {
  const docRef = db.doc(`orders/${order.orderNumber}`);
  batch.create(docRef, order);
  batch.commit();
  res.send('Hello from Firebase!');
});

exports.addOrder = functions.https.onRequest(async (req, res)=>{
  for (let i = 0; i <= 5; i++) {
    const order = generateMock(orderBaseSchema);

    order.orderNumber = i;
    const docRef = db.collection('orders').doc(`${order.orderNumber}`);

    batch.set(docRef, order);
  }
  await batch.commit();
  res.status(200).json({successfull: true});
});
