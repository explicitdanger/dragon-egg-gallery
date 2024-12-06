// types/global.d.ts
import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

// This export is required to make the file a module.
export {};
