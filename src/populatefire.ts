import * as functions from 'firebase-functions';
import * as firebaseAdmin from 'firebase-admin';
import 'firebase-functions';
import {mockData} from './orderZod';



firebaseAdmin.initializeApp();
const db = firebaseAdmin.firestore();
db.settings({
  timestampsInSnapshots: true,
});



for (let i = 0; i < 20; i++) {
    functions.https.onRequest((req, res)=> {
        // const mockData = req.body;
         db.doc('orders/order').create({
          date: mockData.date,
          items: mockData.items,
          total: mockData.total,
          subtotal: mockData.subtotal,
          client : mockData.client,
          referralCode: mockData.referralCode,
          factura: mockData.factura,
          formaPago: mockData.formaPago,
          totalSinImpuestos: mockData.totalSinImpuestos,
          totalDescuento: mockData.totalDescuento,
          currency: mockData.currency,
        });
        res.send(200);
      });
}