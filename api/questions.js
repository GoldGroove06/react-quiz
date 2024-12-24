const data = require('./data/questions.json');

console.log(data)

export function GET(request) {
  return new Response(data);
}
