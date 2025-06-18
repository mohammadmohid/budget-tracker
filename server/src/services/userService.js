import { getDB } from "../config/mongo.js";

const COLLECTION = "users";

export async function findUserByUID(uid) {
  const db = getDB();
  return db.collection(COLLECTION).findOne({ uid });
}

export async function createOrUpdateUser(firebaseUser) {
  const db = getDB();

  const existing = await findUserByUID(firebaseUser.uid);

  const userData = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.name || "Anonymous",
    avatar: firebaseUser.picture || null,
    updatedAt: new Date(),
    ...(existing ? {} : { createdAt: new Date() }),
  };

  await db
    .collection(COLLECTION)
    .updateOne({ uid: firebaseUser.uid }, { $set: userData }, { upsert: true });

  return await findUserByUID(firebaseUser.uid);
}
