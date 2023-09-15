const KEYS = [
  'ExFFGvT2fZBzTdDFtfXKysgryhCLXIkg',
  'EBKbZeQ1QlE4N1xuBzgec08s0dcltdnt',
  'LHyEVqpqH3XRadXJj1w6rv0a0ZohndJk',
  'cA7VAi6BkNhnUsbkr3MbzXEpvHcHoY0s',
  '0hyoTxwjkFGnBVwxpqUlTmvzI4cZxyf4',
  'EGjEucB0gMPAFV2qxqAOGF9D3c1gC1uL',
  'aKKbrKpe1YGi66K7WzFvajOaocjKPkWa',
  'H3FRH5IMtPz0yNN170uMkDXY0wt0kfbS',
  'a9ln0xE0xoZg0UKIfadTWG9XvaVU3VY0',
  'T9gT3cF0WPsOQPyLn0p0McCuVRVQEnDR',
  'IMARr0RmP8rblBdmV6bMB139uX5n5unh',
  'UOu0YdlrkIoRCSoKuTMZFGpumw0I0Y05',
  'pFLyeAOoTUkhEAUJsqJzz04Hc5pc9jB6',
  'no8t4JST8lO1h1HISonGqBJL9wN1oSkU',
  '7cowQMjSOte3DmsL9oMIjLMUYjC2Fw6m',
];
function getKey() {
  return KEYS[Math.round(Math.random() * (KEYS.length - 1))];
}

export const KEY = getKey();
