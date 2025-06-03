const { MongoClient } = require("mongodb");

const connectionString =
  "mongodb://mongo:uIRbwulzDWAKrZVkpVafGtNPowUSqoHf@ballast.proxy.rlwy.net:26050";

export async function getAllCodeBlocks() {
  // Establishes connection with db and returns all code blocks in the db
  let allCodeBlocks;
  const client = new MongoClient(connectionString);

  try {
    const database = client.db("mydatabase");
    const collection = database.collection("codeBlocks");

    allCodeBlocks = await collection.find().toArray();
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await client.close();
    return allCodeBlocks;
  }
}
export async function insertCodeBlock(codeBlock) {
  // Establishes connection to db and inserts a code block to the db
  const client = new MongoClient(connectionString);

  try {
    const database = client.db("mydatabase");
    const collection = database.collection("codeBlocks");
    const result = await collection.insertOne(codeBlock);
    console.log("Inserted with ID:", result.insertedId);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
