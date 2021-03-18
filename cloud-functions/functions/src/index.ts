//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as uuid from 'uuid';
import * as cors from 'cors';

const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'password'
    ],
    origin: '*',
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  };

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();

main.use(cors(options));
//add the path to receive request and set json as bodyParser to process the body 
main.use('/', app);

//initialize the database and the collection 
const db = admin.firestore();
const oneTimeKeyCollection = 'oneTimeKeyCollection';

//define google cloud function name
export const oneTimeKeys = functions.https.onRequest(main);

function isAuthenticated(password: any) {
    return password === 'JukoDev2021' ? true : false;
}

//  verify Client-Key based on the db-entries
app.get('/verifyOneTimeKey/:keyValue', async (req,res) => {
    try {
        const paramClientKey = req.params.keyValue;
        const keyQuerySnapshot = await db.collection(oneTimeKeyCollection).get();
        const oneTimeKeys: any[] = [];
        keyQuerySnapshot.forEach(
            (doc)=>{
                oneTimeKeys.push({
                    id: doc.id,
                    data:doc.data()
                });
            }
        );

        const clientKey = oneTimeKeys.find(key => key.data['value'] == paramClientKey);

        if(clientKey) {
            if(clientKey.data.remainingKeyCount < 1) {
                res.status(403).send('Error: Invalid One-Time-Key!');
            } else {
                clientKey.data.remainingKeyCount -= 1;
                await db.collection(oneTimeKeyCollection).doc(clientKey.id).update({
                    remainingKeyCount: clientKey.data.remainingKeyCount
                });
                res.status(200).json(clientKey);
            }
        }else {
            res.status(403).send('Error: Invalid One-Time-Key!');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create new key
app.post('/oneTimeKeys', async (req, res) => {
    if(!isAuthenticated(req.header('password'))) {
        res.status(403).send('Invalid Request! Access Not Allowed!');
        return;
    }

    try {
        const oneTimeKey: any = {
            value: req.body['value'] ? req.body['value'] : uuid.v4().substr(0,8),
            remainingKeyCount: req.body['countKeys']
        };

        const keyCollectionSnapshot = await db.collection(oneTimeKeyCollection).get();
        const oneTimeKeys: any[] = [];
        keyCollectionSnapshot.forEach(
            (doc)=>{
                oneTimeKeys.push({
                    id: doc.id,
                    data:doc.data()
            });
            }
        );
        const clientKey = oneTimeKeys.find(key => key.data.value == oneTimeKey.value);

        if(clientKey) {
            await db.collection(oneTimeKeyCollection).doc(clientKey.id).update(oneTimeKey);
        } else {
            await db.collection(oneTimeKeyCollection).add(oneTimeKey);
        }
            
        res.status(201).json(oneTimeKey);
    } catch (error) {
        res.status(400).send(`Invalid Post-Request! Expected: JSON-Object countKeys: number`);
    }
});

//get all keys
app.get('/oneTimeKeys', async (req, res) => {
    if(!isAuthenticated(req.header('password'))) {
        res.status(403).send('Invalid Request! Access Not Allowed!');
        return;
    }

    try {
        const keyCollectionSnapshot = await db.collection(oneTimeKeyCollection).get();
        const oneTimeKeys: any[] = [];
        keyCollectionSnapshot.forEach(
            (doc)=>{
                oneTimeKeys.push({
                    id: doc.id,
                    data:doc.data()
            });
            }
        );
        res.status(200).json(oneTimeKeys);
    } catch (error) {
        res.status(500).send(error);
    }
});

//get a single key
app.get('/oneTimeKeys/:keyId', async(req,res) => {
    if(!isAuthenticated(req.header('password'))) {
        res.status(403).send('Invalid Request! Access Not Allowed!');
        return;
    }

    const keyCollectionSnapshot = await db.collection(oneTimeKeyCollection).get();
        const oneTimeKeys: any[] = [];
        keyCollectionSnapshot.forEach(
            (doc)=>{
                oneTimeKeys.push({
                    id: doc.id,
                    data:doc.data()
            });
            }
        );
    const clientKey = oneTimeKeys.find(key => key.data.value == req.params.keyId);

    db.collection(oneTimeKeyCollection).doc(clientKey.id).get()
    .then(key => {
        if(!key.exists) throw new Error('Key not found');
        res.status(200).json({id:key.id, data:key.data()})})
    .catch(error => res.status(500).send(error));
        
});


// Delete a key
app.delete('/oneTimeKeys/:keyId', async(req, res) => {
    if(!isAuthenticated(req.header('password'))) {
        res.status(403).send('Invalid Request! Access Not Allowed!');
        return;
    }

    const keyCollectionSnapshot = await db.collection(oneTimeKeyCollection).get();
        const oneTimeKeys: any[] = [];
        keyCollectionSnapshot.forEach(
            (doc)=>{
                oneTimeKeys.push({
                    id: doc.id,
                    data:doc.data()
            });
            }
        );
    const clientKey = oneTimeKeys.find(key => key.data.value == req.params.keyId);

    db.collection(oneTimeKeyCollection).doc(clientKey.id).delete()
    .then( () => res.status(204).send())
    .catch(function (error) {
        res.status(404).send(error);
    });
})

// Delete all Keys

app.delete('/oneTimeKeys', async(req, res) => {
    if(!isAuthenticated(req.header('password'))) {
        res.status(403).send('Invalid Request! Access Not Allowed!');
        return;
    }
    const keyCollectionSnapshot = await db.collection(oneTimeKeyCollection).get();

    keyCollectionSnapshot.forEach(key => {
        db.collection(oneTimeKeyCollection).doc(key.id).delete()
        .then(() => res.status(204).send('Collection successfully deleted!'))
        .catch(function(error) {
            res.status(500).send(error);
        });
    });
});
