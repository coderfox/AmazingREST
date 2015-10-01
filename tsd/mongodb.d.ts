// Type definitions for MongoDB
// Project: https://github.com/mongodb/node-mongodb-native
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Documentation : http://mongodb.github.io/node-mongodb-native/

/// <reference path='../typings/node/node.d.ts' />

declare module "mongodb" {

  // Class documentation : http://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
  export class MongoClientAsync {
    connectAsync(uri: string, options?: any): Promise<Db>;
  }

  // Class documentation : http://mongodb.github.io/node-mongodb-native/api-generated/db.html
  export class DbAsync {
    public openAsync(): Promise<Db>;
    public closeAsync(forceClose?: boolean): Promise<any>;
  }

  // Documentation : http://mongodb.github.io/node-mongodb-native/api-generated/collection.html
  export interface CollectionAsync {
    // Documentation : http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#insertOne
    insertOneAsync(doc: any, options?: { w?: any; wtimeout?: number; j?: boolean; serializeFunctions?: boolean; forceServerObjectId?: boolean }): Promise<any>;

    // Documentation : http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#deleteOne
    deleteOneAsync(filter: any, options?: { w?: any; wtimeout?: number; j?: boolean; }): Promise<any>;

    // Documentation : http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#deleteMany
    deleteManyAsync(filter: any, options?: { w?: any; wtimeout?: number; j?: boolean; }): Promise<any>;

    saveAsync(doc: any, options?: { w?: any; wtimeout?: number; j?: boolean; }): Promise<any>;

    // Documentation : http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#updateOne
    updateOneAsync(filter: Object, update: any, options?: { upsert?: boolean; w?: any; wtimeout?: number; j?: boolean; }): Promise<any>;

    // Documentation : http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#updateMany
    updateManyAsync(filter: Object, update: any, options?: { upsert?: boolean; w?: any; wtimeout?: number; j?: boolean; }): Promise<any>;

    // Documentation : http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findOneAndDelete
    findOneAndDeleteAsync(filter: any, options?: { projection?: any; sort?: any; maxTimeMS?: number; }): Promise<any>;

    // Documentation : http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findOneAndReplace
    findOneAndReplaceAsync(filter: any, replacement: any, options?: { projection?: any; sort?: any; maxTimeMS?: number; upsert?: boolean; returnOriginal?: boolean }): Promise<any>;

    // Documentation : http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findOneAndUpdate
    findOneAndUpdateAsync(filter: any, update: any, options?: { projection?: any; sort?: any; maxTimeMS?: number; upsert?: boolean; returnOriginal?: boolean }): Promise<any>;

    findAsync(selector?: Object, fields?: any, options?: CollectionFindOptions): Promise<Cursor>;
    findAsync(selector: Object, fields: any, skip: number, limit: number, timeout?: number): Promise<Cursor>;

    findOneAsync(selector: Object, fields?: any, options?: CollectionFindOptions): Promise<any>;
    findOneAsync(selector: Object, fields: any, skip: number, limit: number, timeout?: number): Promise<any>;
  }

  // Class documentation : http://mongodb.github.io/node-mongodb-native/api-generated/cursor.html
  // Last update: doc. version 1.3.13 (29.08.2013)
  export class CursorAsync {
    // INTERNAL TYPE
    // constructor (db: Db, collection: Collection, selector, fields, skip, limit, sort, hint, explain, snapshot, timeout, tailable, batchSize, slaveOk, raw, read, returnKey, maxScan, min, max, showDiskLoc, comment, awaitdata, numberOfRetries, dbName, tailableRetryInterval, exhaust, partial);
    // constructor(db: Db, collection: Collection, selector, fields, options);

    rewind(): Cursor;
    toArray(callback: (err: Error, results: any[]) => any): void;
    toArrayAsync(): Promise<any[]>;
    each(callback: (err: Error, item: any) => void): void;
    count(applySkipLimit: boolean, callback: (err: Error, count: number) => void): void;

    sort(keyOrList: any, callback?: (err: Error, result: any) => void): Cursor;

    // this determines how the results are sorted. "asc", "ascending" or 1 for asceding order while "desc", "desceding or -1 for descending order. Note that the strings are case insensitive.
    sort(keyOrList: String, direction: string, callback: (err: Error, result: any) => void): Cursor;
    limit(limit: number, callback?: (err: Error, result: any) => void): Cursor;
    setReadPreference(preference: string, callback?: Function): Cursor;
    skip(skip: number, callback?: (err: Error, result: any) => void): Cursor;
    batchSize(batchSize: number, callback?: (err: Error, result: any) => void): Cursor;

    nextObject(callback: (err: Error, doc: any) => void): void;
    explain(callback: (err: Error, result: any) => void): void;

    stream(): CursorStream;

    close(callback: (err: Error, result: any) => void): void;
    isClosed(): boolean;

    public static INIT: number;
    public static OPEN: number;
    public static CLOSED: number;
    public static GET_MORE: number;
  }
}
