import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";

export async function getMovies(year: number, imdb: number) {
  configDotenv();
  const uri = process.env.MONGODB_URL || "";
  console.log("Ajiljiina", uri);
  const client = new MongoClient(uri);
  try {
    console.log("aaa");
    await client.connect();
    const database = client.db("sample_mflix");

    const collection = database.collection("movies");
    const findQuery = {
      $and: [{ "imdb.rating": { $gt: imdb } }, { year: { $gt: year } }],
    };
    const movies = await collection.find(findQuery).limit(10).toArray();
    return movies;
  } catch (error) {
    console.log("Error!!", error);
  } finally {
    await client.close();
  }
}
