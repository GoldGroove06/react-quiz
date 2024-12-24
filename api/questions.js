const data = require('./data/questions.json');



export function GET(request) {
  return new Response(data)
}
