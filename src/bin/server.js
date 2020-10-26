import app from '../index.js';

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.listen(port, hostname)
  .then((address) => console.log(`server listening on ${address}`))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
