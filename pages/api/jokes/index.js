import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  console.log("request.method in /api/jokes", request.method);

  if (request.method === "GET") {
    const jokes = await Joke.find();
    return response.status(200).json(jokes);
  }

  if (request.method === "POST") {
    console.log("POST REQUEST!!!!");
    // insert a new document into database

    try {
      const jokeData = request.body;
      console.log("jokeData: ", jokeData);
      await Joke.create(jokeData);

      return response.status(201).json({ status: "Joke created" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }

    // method not allowed
    // return response.status(405);
  }

  // Break Time
  // Meet back at 10:25

  // not a GET request send back a response
  // saying method not allowed
}
