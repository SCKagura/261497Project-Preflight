npm i
npm i dayjs axios @picocss/pico

docker compose --env-file ./.env.test up -d --force-recreate --build

#Tag image
docker tag g6-projectpreflight-frontend sckagura/g6-frontend:latest
#Push image
⌨️ docker push sckagura/g6-frontend:latest
