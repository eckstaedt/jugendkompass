//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as request from "request-promise-native";
import * as dayjs from 'dayjs';
import * as telegraf from 'telegraf';
import { createClient } from '@supabase/supabase-js';

const url: string = 'https://wp.jugendkompass.com/wp-json/wp/v2/';
const impulsesId: number = 9;
const vdtId: number = 42;
// const url: string = 'https://eckstaedt-webdesign.com/wp-json/wp/v2/';
// const impulsesId: number = 19;

admin.initializeApp();

const db = admin.firestore();

exports.sendTestPush = functions.https.onCall((data: any, _: functions.https.CallableContext) => {
  const payload: admin.messaging.MessagingPayload = {
    notification: {
      ...data.notification,
      image: data.notification.image ? data.notification.image : '',
      title: data.notification.title ? data.notification.title : ''
    },
    data: data.data
  };

  admin.messaging().sendToTopic('admin', payload);

  return data;
});

exports.sendPush = functions.https.onCall((data: any, _: functions.https.CallableContext) => {
  const payload: admin.messaging.MessagingPayload = {
    notification: {
      ...data.notification,
      image: data.notification.image ? data.notification.image : '',
      title: data.notification.title ? data.notification.title : ''
    },
    data: data.data
  };

  admin.messaging().sendToTopic(data.topic ? data.topic : 'general', payload);

  return data;
});

exports.sendVdt = functions.pubsub.schedule('0 8 * * *').timeZone("Europe/Berlin").onRun(async (): Promise<any> => {
  const res: any = await db
    .collection("vdt")
    .where('date', '>=', dayjs().startOf('d').toISOString())
    .where('date', '<=', dayjs().endOf('d').toISOString())
    .orderBy('date', 'desc')
    .limit(1)
    .get();

  let success = false;

  res.forEach((snap: any) => {
    const data = snap.data();

    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: "Vers des Tages",
        body: `${data.content.replace(/<[^>]+>/g, '')} (${data.title})`.replace(/(\r\n|\n|\r)/gm, ""),
      },
      // data: data.data
    };

    admin.messaging().sendToTopic('vdt', payload);

    success = true;
  });

  if (success) {
    return "VDT send successfully";
  } else {
    return "No VDT available";
  }
});

exports.sendImpulse = functions.pubsub.schedule('0 8 * * *').timeZone("Europe/Berlin").onRun(async (): Promise<any> => {
  const res: any = await db
    .collection("impulses")
    .where('date', '>=', dayjs().subtract(1, 'd').toISOString())
    .where('date', '<=', dayjs().toISOString())
    .orderBy('date', 'desc')
    .limit(1)
    .get();

  let success = false;

  res.forEach((snap: any) => {
    const data = snap.data();

    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: "Neue Andacht",
        body: `Die neue Andacht „${data.title}" ist in der Jugendkompass-App online!`,
        image: data.postImg?.source_url,
      },
      data: {
        impulse: data.id.toString()
      }
    };

    admin.messaging().sendToTopic('impulse', payload);

    success = true;
  });

  if (success) {
    return "Impulse send successfully";
  } else {
    return "No Impulse available";
  }
});

exports.syncPostsWithWordPress = functions.pubsub.schedule('0 * * * *').timeZone("Europe/Berlin").onRun(async (): Promise<any> => {
  let posts: any[] = [];
  let page: number = 1;

  const getPosts: Function = async () => {
    const options: any = {
      uri: `${url}posts?_embed&per_page=100&page=${page.toString()}`,
    };
    const res: any = await request.get(options);
    const newPosts: any[] = JSON.parse(res);
    posts = posts.concat(newPosts);
    if (newPosts.length === 100) {
      page += 1
      await getPosts(page);
    }
  };

  try {
    await getPosts();
  } catch (error) {
    if (!posts.length) {
      return `Could not load posts from Wordpress (${url}) ${error}`;
    }
  }

  const batch = db.batch();

  for (const post of posts) {
    let postRef: any;
    if (post.categories.find((cat: number) => cat === impulsesId)) {
      postRef = db.collection("impulses").doc(`${post.id}`);
    } else if (post.categories.find((cat: number) => cat === vdtId)) {
      postRef = db.collection("vdt").doc(`${post.id}`);
    } else {
      postRef = db.collection("posts").doc(`${post.id}`);
    }
    batch.set(postRef, {
      id: `${post.id}`,
      date: post.date,
      fbDate: admin.firestore.Timestamp.fromDate(new Date(post.date)),
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
      uri: `${url}pages?_embed&per_page=100`,
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
        id: page.title.rendered === 'Impressum' ? 'imprint' : 'dataprot',
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

exports.getNewPlayers = functions.pubsub.schedule('0 14 * * 1').timeZone("Europe/Berlin").onRun(async (): Promise<any> => {
  const supabase = createClient(functions.config().supabase.url, functions.config().supabase.key);
  const response = await supabase
    .from<any>('player')
    .select('*')
    .gt("joined", dayjs().subtract(2, "month").toISOString())
    .order("instrument")
    .order("lastName");

  if (response.data && response.data.length) {
    let message: string = `Neue Spieler:\n`;

    for (const player of response.data) {
      message += `${player.firstName} ${player.lastName}\n`;
    }

    const bot = new telegraf.Telegram(functions.config().bot.token, {});
    bot.sendMessage(
      functions.config().bot.group,
      message
    );
    return "successfully send";
  } else {
    return "no data";
  }
});
