import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '2m', target: 1 },
    // { duration: '2m', target: 10 },
    // { duration: '2m', target: 100 },
    // { duration: '20m', target: 500 },
    // { duration: '30m', target: 1000 },
    // { duration: '2m', target: 0 },
  ],
};
// GET
export default () => {
  const BASE_URL = `http://localhost:3003/availability/${Math.floor(Math.random() * (10000000 - 9000000) + 9000000)}`;
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  check(http.get(BASE_URL, params), {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);

  sleep(1);
};
// POST
// export default () => {
//   const url = `http://localhost:3003/availability/${Math.floor(Math.random() * (10000000 - 9000000) + 9000000)}`;
//   const headers = { 'Content-Type': 'application/json' };
//   const data = { room_id: 107, available: true };
//   let res = http.put(url, JSON.stringify(data), { headers: headers });
//   check(res, {
//     'status is 200': (r) => r.status === 200,
//   }) || errorRate.add(1);
//   sleep(1);
// };