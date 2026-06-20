FROM node:18-alpine AS build

#ARG for environment
ARG NEXT_PUBLIC_BACKEND_URL

# ARG NEXT_PUBLIC_SITE_KEY_DUMMY - Un Used

# ARG NEXT_PUBLIC_SITE_KEY - Usimg Doppler

ARG NEXT_PUBLIC_PARENT_URL

ARG NEXT_PUBLIC_SELLER_URL

# ARG NEXT_PUBLIC_IS_SANDBOX - Using Doppler

ARG NEXT_PUBLIC_MARKET_PLACE_URL

# ARG NEXTAUTH_URL

ARG DOPPLER_TOKEN

# ARG SECRET - Using Doppler

# Create app directory
WORKDIR /usr/src/app
# Install pm2 dependencies
RUN npm install pm2 -g
# Bundle app source
COPY . .
# Build app from ts to js
RUN npm install

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

RUN ["doppler", "run", "--", "npm", "run", "build"]

# ENV SECRET=${SECRET}


FROM node:18-alpine AS server

ARG NEXTAUTH_URL

ARG SECRET

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/ecosystem.config.json ./
COPY --from=build /usr/src/app/next.config.js ./
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/node_modules ./node_modules

# COPY --from=build ./ ./

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

EXPOSE 3000

ENV NEXTAUTH_URL=${NEXTAUTH_URL}

ENV SECRET=${SECRET}


CMD ["doppler", "run", "--","npm", "start"]