FROM $CI_REGISTRY/image/node-16.x/master:latest as build

ARG CI_REGISTRY
ARG GITLAB_CI_ACCESS
ARG GITLAB_CI_TOKEN
ARG CI_DEFAULT_BRANCH
ARG REPO_DIR
ARG CI_REPOSITORY_URL

RUN git config --global url."https://$GITLAB_CI_ACCESS:$GITLAB_CI_TOKEN@git.edenfarm.id/".insteadOf "https://git.edenfarm.id/"

RUN git clone --single-branch --branch $CI_DEFAULT_BRANCH $CI_REPOSITORY_URL $REPO_DIR/frontend

WORKDIR $REPO_DIR/frontend

COPY docker/.env .

RUN npm install

RUN npm run generate

FROM $CI_REGISTRY/image/nginx/master:latest

WORKDIR $REPO_DIR/frontend
RUN mkdir /var/log/nginx/logs
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY docker/frontend.edenfarm.conf /etc/nginx/conf.d/frontend.edenfarm.conf
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/frontend/dist ./dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
