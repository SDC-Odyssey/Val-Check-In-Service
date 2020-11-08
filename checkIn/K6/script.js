import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '2m', target: 1 },
    // { duration: '2m', target: 10 },
    // { duration: '2m', target: 100 },
    // { duration: '2m', target: 500 },
    // { duration: '2m', target: 1000 },
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
//   const BASE_URL = `http://localhost:3003/availability/`;
//   var params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   var data = JSON.stringify({
//     "date": "2020-11-05T20:55:09.627Z",
//     "room_id": 103,
//     "available": true
//   });
//   check(http.post(BASE_URL, data, params), {
//     'status is 201': (r) => r.status == 201,
//   }) || errorRate.add(1);

//   sleep(1);
// };