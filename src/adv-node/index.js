import OS from 'os';
console.log( OS.cpus().length,"OS CPU LENGTH")
process.env.UV_THREADPOOL_SIZE = 8;

import * as http from 'http';
import bcrypt from 'bcrypt';
import { performance } from 'perf_hooks';

// 3700 req/sec - UV_THREADPOOL_SIZE=1
// 3700 req/sec - UV_THREADPOOL_SIZE=2

const app=http.createServer(async (req, res) => {
	const startTime=performance.now();
  const hash = await bcrypt.hash("Hello World", 2);
  const endTime = performance.now();
  const duration = endTime - startTime;

  console.log("Hash Text", hash);
  console.log("Hashing duration:", duration, "ms");

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(`Hash: ${hash}\n`);
  res.write(`Duration: ${duration} ms`);
  res.end();
}).listen(8000, () => {
  console.log('Server is listening on port 8000');
});
