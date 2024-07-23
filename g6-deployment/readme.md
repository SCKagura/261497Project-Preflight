# Note: This version allow multiple instances of the app to be deployed on the same VM.

# Get started

ลบ container image volume ของ docker

- Make `.env` from `.env.example` (Make necessary changes.)
  docker compose up -d --force-recreate

# Setup database

docker exec -it g6-db bash
psql -U SCKagura -d g6db

- Don't forget to change the password.

```
REVOKE CONNECT ON DATABASE g6db FROM public;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
CREATE USER appuser WITH PASSWORD '1234';
CREATE SCHEMA drizzle;
GRANT ALL ON DATABASE g6db TO appuser;
GRANT ALL ON SCHEMA public TO appuser;
GRANT ALL ON SCHEMA drizzle TO appuser;
```

docker exec -it g6-backend sh
npm run db:generate
npm run db:migrate
