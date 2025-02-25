#!/bin/sh

until nc -z $MONGO_HOST $MONGO_PORT
do
    echo "Waiting for Mongo ($MONGO_HOST:$MONGO_PORT) to start..."
    sleep 1
done

until nc -z $FLASK_HOST $FLASK_PORT
do
    echo "Waiting for Flask ($FLASK_HOST:$FLASK_PORT) to start..."
    sleep 1
done

until nc -z $REDIS_HOST $REDIS_PORT
do
    echo "Waiting for Redis ($REDIS_HOST:$REDIS_PORT) to start..."
    sleep 1
done

if [ $APP_ENV = "production" ]; then
  NODE_ENV=production npx pm2 start ecosystem.config.js --no-daemon;
elif [ $APP_ENV = "development" ]; then
  NODE_ENV=development npx pm2 start ecosystem.config.js --no-daemon;
else
  NODE_ENV=test npm test;
fi