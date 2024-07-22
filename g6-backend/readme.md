เปลี่ยน .env.example -> .env
เปลี่ยน .env.test.example -> env.test

#Packages
npm init -y
npm i express cors helmet
npm i typescript ts-node tsconfig-paths
npm i -D @types/cors @types/express tsc-alias
npm i drizzle-orm postgres dotenv
npm i -D drizzle-kit nodemon

npm run dev
npm run start

docker compose --env-file ./.env.test up -d --force-recreate --build

#Push to Dockerhub
#Tag image
docker tag g6-projectpreflight-backend sckagura/g6-backend:latest
docker login
#Push image
docker push sckagura/g6-backend:latest
