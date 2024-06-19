export default function handler(request, response) {
  console.log("request.method: ", request.method);

  response.status(200).json({ success: true });
}
