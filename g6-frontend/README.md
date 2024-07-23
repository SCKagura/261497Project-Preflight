เปลี่ยน .env.example -> .env
เปลี่ยน .env.test.example -> .env.test

npm i
npm i dayjs axios @picocss/pico
npm run dev
docker compose --env-file ./.env.test up -d --force-recreate --build

## Repo Dockerhub ของตัวเองเน้อ

#Tag image
docker tag g6-frontend sckagura/g6-frontend:latest
#Push image
docker push sckagura/g6-frontend:latest
