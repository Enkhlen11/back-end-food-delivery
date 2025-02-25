import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";

export async function createFood() {
  configDotenv();
  const uri = process.env.MONGODB_URL || "";
  console.log("Ajiljiina", uri);
  const client = new MongoClient(uri);
  try {
    console.log("aaa");
    await client.connect();
    const database = client.db("food_delivery");

    const collection = database.collection("food");

    const food = await collection.insertMany([
      {
        name: "Brie Crostini Appertizer",
        img: "res.clod",
        price: "$12.99",
        description:
          "Fluffy pancakes stacked with fruits, cream, syrup, and powdere sugar.",
      },
      {
        name: "Budaatai huurga",
        img: "res.clod",
        price: "15000",
        description: "Uhriin mahtai budaatai huurga",
      },
    ]);
    return food;
  } catch (error) {
    console.log("Error!!", error);
  } finally {
    await client.close();
  }
}
