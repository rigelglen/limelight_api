const { app } = require('./server');
const Topic = require('./components/topic/topic.model');
const { categories } = require('./util/test.seed');
const port = process.env.NODE_PORT;
const { disconnectMongo, disconnectRedis } = require('./core/db');
const logger = require('./core/logger');

Topic.insertMany(categories, { ordered: false })
  .then((res) => {
    logger.info('Database seeded');
  })
  .catch((e) => {
    logger.info('Database already seeded');
  });

const server = app.listen(port, function() {
  logger.info('Server listening on port ' + port);
});

if (process.env.NODE_ENV !== 'test') {
  process.on('SIGINT', async function() {
    try {
      await disconnectMongo();
      await disconnectRedis();
      process.exit(0);
    } catch (e) {
      process.exit(1);
    }
  });
}
