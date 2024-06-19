import useSWR from "swr";

export default function JokeForm() {
  const { mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("submitting the form");

    // console.log(event.target.joke.value);
    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    console.log("jokeData:", jokeData);
    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeData),
    });

    console.log("response: ", response);
    if (response.ok) {
      mutate();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke">Add a Joke</label>
      <input id="joke" name="joke" type="text" />
      <input id="isFunny" name="isFunny" type="checkbox" />
      <button type="submit">Submit</button>
    </form>
  );
}
