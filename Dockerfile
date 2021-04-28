FROM node:16-alpine as builder
WORKDIR /root
COPY ./ ./
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
        && apk update \
        && apk upgrade \
        && npm config set registry https://registry.npm.taobao.org \
        && npm install \
        && npm run build \
        && rm -rf node_modules \
        && rm -rf .git

FROM node:16-alpine
WORKDIR /root
COPY --from=builder /root/ /root/
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
        && apk update \
        && apk upgrade \
        && npm config set registry https://registry.npm.taobao.org \
        && npm install --production
EXPOSE 80
CMD [ "node", "dist/app.js" ]