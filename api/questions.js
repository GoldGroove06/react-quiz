const data = require('./data/questions.json');

console.log(data)

export function GET(request) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
