import {MongoClient} from "mongodb"
import { DB_NAME } from "../../constants/index";

const MONGO_URI = process.env.MONGO_URI;
const COLLECTION_NAME = "vectorEmbeddings"

let client;
let db;

export async function connectDB() {
    if(!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect(MONGO_URI);
        db = client.db(DB_NAME);
    }
    return db.collection(COLLECTION_NAME)
}

/*

 Why is this needed if you already have a MongoDB connection?
Your existing Mongoose-based connection (connect() in Database.js) is good for traditional MongoDB operations like inserting documents, querying users, etc.

However, MongoDB Vector Search works best with the MongoDB Node.js Driver instead of Mongoose. The Node.js driver directly interacts with MongoDB's vector search features, allowing for efficient vector-based queries.

*/