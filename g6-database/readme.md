เปลี่ยน .env.example -> .env
docker compose up -d

DB user management
docker exec -it g6-db bash
psql -U SCKagura -d g6db

REVOKE CONNECT ON DATABASE g6db FROM public;
REVOKE ALL ON SCHEMA public FROM public;
CREATE USER appuser WITH PASSWORD '1234';
CREATE SCHEMA drizzle;
GRANT ALL ON DATABASE g6db TO appuser;
GRANT ALL ON SCHEMA public TO appuser;
GRANT ALL ON SCHEMA drizzle TO appuser;

## ถ้าเริ่มใหม่จาก 0 ห้ามทำ

#Setting up Drizzle
npm init -y
npm i drizzle-orm postgres dotenv
npm i -D drizzle-kit
npm i typescript ts-node tsconfig-paths

###

npx drizzle-kit push
npx drizzle-kit generate
npx ts-node ./db/migrate.ts
npx ts-node ./db/prototype.ts

## CypressTest

เปลี่ยนข้อมูล docker-compose.yml
docker compose --env-file ./.env.testcypress up -d --force-recreate --build

DB
docker exec -it g6-testcypress-db bash
psql -U SCKagura -d g6db

REVOKE CONNECT ON DATABASE g6db FROM public;
REVOKE ALL ON SCHEMA public FROM public;
CREATE USER appuser WITH PASSWORD '1234';
CREATE SCHEMA drizzle;
GRANT ALL ON DATABASE g6db TO appuser;
GRANT ALL ON SCHEMA public TO appuser;
GRANT ALL ON SCHEMA drizzle TO appuser;

npm i drizzle-orm postgres dotenv
npm i -D drizzle-kit
npm i typescript ts-node tsconfig-paths
npx drizzle-kit push
npx drizzle-kit generate
npx ts-node ./db/migrate.ts
npx ts-node ./db/prototype.ts
