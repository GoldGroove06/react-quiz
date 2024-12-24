const data = require('./data/question.json');

export default function handler(req, res) {
  res.status(200).json(data);
}
