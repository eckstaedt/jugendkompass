//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as uuid from 'uuid';
import * as cors from 'cors';
import * as request from "request-promise-native";

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'password',
  ],
  origin: '*',
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};
// const url: string = 'https://jugendkompass.com/wp-json/wp/v2/';
// const impulsesId: number = 9;
const url: string = 'https://eckstaedt-webdesign.com/wp-json/wp/v2/';
const impulsesId: number = 19;

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

function isAuthenticated(password: string) {
  return password === 'JukoDev2021' ? true : false;
}

//  verify Client-Key based on the db-entries
app.get('/verifyOneTimeKey/:keyValue', async (req: any, res: any) => {
  try {
    const paramClientKey = req.params.keyValue;
    const keyQuerySnapshot = await db.collection(oneTimeKeyCollection).get();
    const oneTimeKeys: any[] = [];
    keyQuerySnapshot.forEach((doc: { id: string, data: Function }) => {
      oneTimeKeys.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    const clientKey = oneTimeKeys.find(
      key => key.data['value'] == paramClientKey,
    );

    if (clientKey) {
      if (clientKey.data.remainingKeyCount < 1) {
        res.status(403).send('Error: Invalid One-Time-Key!');
      } else {
        clientKey.data.remainingKeyCount -= 1;
        await db.collection(oneTimeKeyCollection).doc(clientKey.id).update({
          remainingKeyCount: clientKey.data.remainingKeyCount,
          usedKeys: admin.firestore.FieldValue.increment(1)
        });
        res.status(200).json(clientKey);
      }
    } else {
      res.status(403).send('Error: Invalid One-Time-Key!');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create new key
app.post('/oneTimeKeys', async (req: any, res: any) => {
  if (!isAuthenticated(req.header('password'))) {
    res.status(403).send('Invalid Request! Access Not Allowed!');
    return;
  }

  try {
    const oneTimeKey: any = {
      value: req.body['value'] ? req.body['value'] : uuid.v4().substr(0, 8),
      remainingKeyCount: req.body['countKeys'],
    };

    const keyCollectionSnapshot = await db
      .collection(oneTimeKeyCollection)
      .get();
    const oneTimeKeys: any[] = [];
    keyCollectionSnapshot.forEach((doc: { id: string, data: Function }) => {
      oneTimeKeys.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    const clientKey = oneTimeKeys.find(
      key => key.data.value == oneTimeKey.value,
    );

    if (clientKey) {
      await db
        .collection(oneTimeKeyCollection)
        .doc(clientKey.id)
        .update(oneTimeKey);
    } else {
      await db.collection(oneTimeKeyCollection).add(oneTimeKey);
    }

    res.status(201).json(oneTimeKey);
  } catch (error) {
    res
      .status(400)
      .send(`Invalid Post-Request! Expected: JSON-Object countKeys: number`);
  }
});

//get all keys
app.get('/oneTimeKeys', async (req: any, res: any) => {
  if (!isAuthenticated(req.header('password'))) {
    res.status(403).send('Invalid Request! Access Not Allowed!');
    return;
  }

  try {
    const keyCollectionSnapshot = await db
      .collection(oneTimeKeyCollection)
      .get();
    const oneTimeKeys: any[] = [];
    keyCollectionSnapshot.forEach((doc: { id: string, data: Function }) => {
      oneTimeKeys.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.status(200).json(oneTimeKeys);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get a single key
app.get('/oneTimeKeys/:keyId', async (req: any, res: any) => {
  if (!isAuthenticated(req.header('password'))) {
    res.status(403).send('Invalid Request! Access Not Allowed!');
    return;
  }

  const keyCollectionSnapshot = await db.collection(oneTimeKeyCollection).get();
  const oneTimeKeys: any[] = [];
  keyCollectionSnapshot.forEach((doc: { id: string, data: Function }) => {
    oneTimeKeys.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  const clientKey = oneTimeKeys.find(key => key.data.value == req.params.keyId);

  db.collection(oneTimeKeyCollection)
    .doc(clientKey.id)
    .get()
    .then((key: any) => {
      if (!key.exists) throw new Error('Key not found');
      res.status(200).json({ id: key.id, data: key.data() });
    })
    .catch((error: Error) => res.status(500).send(error));
});

// Delete a key
app.delete('/oneTimeKeys/:keyId', async (req: any, res: any) => {
  if (!isAuthenticated(req.header('password'))) {
    res.status(403).send('Invalid Request! Access Not Allowed!');
    return;
  }

  const keyCollectionSnapshot = await db.collection(oneTimeKeyCollection).get();
  const oneTimeKeys: any[] = [];
  keyCollectionSnapshot.forEach((doc: { id: string, data: Function }) => {
    oneTimeKeys.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  const clientKey = oneTimeKeys.find(key => key.data.value == req.params.keyId);

  db.collection(oneTimeKeyCollection)
    .doc(clientKey.id)
    .delete()
    .then(() => res.status(204).send())
    .catch(function (error: Error) {
      res.status(404).send(error);
    });
});

// Delete all Keys
app.delete('/oneTimeKeys', async (req: any, res: any) => {
  if (!isAuthenticated(req.header('password'))) {
    res.status(403).send('Invalid Request! Access Not Allowed!');
    return;
  }
  const keyCollectionSnapshot = await db.collection(oneTimeKeyCollection).get();

  keyCollectionSnapshot.forEach((key: { id: string }) => {
    db.collection(oneTimeKeyCollection)
      .doc(key.id)
      .delete()
      .then(() => res.status(204).send('Collection successfully deleted!'))
      .catch((error: Error) => {
        res.status(500).send(error);
      });
  });
});

exports.sendTestPush = functions.https.onCall((data: any, _: functions.https.CallableContext) => {
  const payload: admin.messaging.MessagingPayload = {
    notification: data.notification,
    data: data.data
  };

  admin.messaging().sendToTopic('admin', payload);

  return data;
});

exports.sendPush = functions.https.onCall((data: any, _: functions.https.CallableContext) => {
  const payload: admin.messaging.MessagingPayload = {
    notification: data.notification,
    data: data.data
  };

  admin.messaging().sendToTopic('general', payload);

  return data;
});

exports.syncPostsWithWordPress = functions.pubsub.schedule('0 * * * *').timeZone("Europe/Berlin").onRun(async (): Promise<any> => {
  let posts: any[];

  try {
    const options: any = {
      uri: `${url}posts?_embed&per_page=100`,
    };
    const res: any = await request.get(options);
    posts = JSON.parse(res);
  } catch (error) {
    return `Could not load posts from Wordpress (${url}) ${error}`;
  }

  const batch = db.batch();

  for (const post of posts) {
    let postRef: any;
    if (post.categories.find((cat: number) => cat === impulsesId)) {
      postRef = db.collection("impulses").doc(`${post.id}`);
    } else {
      postRef = db.collection("posts").doc(`${post.id}`);
    }
    batch.set(postRef, {
      id: `${post.id}`,
      date: post.date,
      modified: post.modified,
      status: post.status,
      type: post.type,
      link: post.link,
      content: post.content.rendered,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      categories: post.categories,
      wpViews: parseInt(post.views, 10),
      readingTime: post.readingTime,
      postImg: post._embedded['wp:featuredmedia']
        ? post._embedded['wp:featuredmedia'][0].media_details.sizes.large
          ? post._embedded['wp:featuredmedia'][0].media_details.sizes.large
          : post._embedded['wp:featuredmedia'][0].media_details.sizes.medium
        : ""
    }, {
      merge: true
    });
  }

  await batch.commit();
  return "Successfully updated posts";
});

exports.syncCategoriesWithWordPress = functions.pubsub.schedule('0 * * * *').timeZone("Europe/Berlin").onRun(async (): Promise<any> => {
  let categories: any[];

  try {
    const options: any = {
      uri: `${url}categories?_embed&per_page=100`,
    };
    const res: any = await request.get(options);
    categories = JSON.parse(res);
  } catch (error) {
    return `Could not load categories from Wordpress (${url}) ${error}`;
  }

  const batch = db.batch();

  for (const category of categories) {
    const postRef = db.collection("categories").doc(`${category.id}`);
    batch.set(postRef, {
      id: `${category.id}`,
      link: category.link,
      parent: category.parent,
      count: category.count,
      description: category.description,
      name: category.name,
      taxonomy: category.taxonomy
    }, { 
      merge: true
    });
  }

  await batch.commit();
  return "Successfully updated categories";
});

exports.syncPagesWithWP = functions.pubsub.schedule('0 1 * * *').timeZone("Europe/Berlin").onRun(async (): Promise<any> => {
  let pages: any[];

  try {
    const options: any = {
      uri: `${url}posts?_embed&per_page=100`,
    };
    const res: any = await request.get(options);
    pages = JSON.parse(res);
  } catch (error) {
    return `Could not load pages from Wordpress (${url}) ${error}`;
  }

  const batch = db.batch();

  for (const page of pages) {
    if (page.title.rendered === 'Impressum' ||
      page.title.rendered === 'Datenschutzerkl\u00e4rung' ||
      page.title.rendered === 'Datenschutzerklärung') {
      const postRef = db.collection("pages").doc(
        page.title.rendered === 'Impressum' ? 'imprint' : 'dataprot'
      );
      batch.set(postRef, {
        pageId: `${page.id}`,
        link: page.link,
        title: page.title.rendered,
        content: page.content.rendered,
        modified: page.modified
      }, {
        merge: true
      });
    }
  }

  await batch.commit();
  return "Successfully updated pages";
});
