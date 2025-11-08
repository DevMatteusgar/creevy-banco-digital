# Etapa 1: build Angular
FROM node:20-alpine AS build
WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install -g @angular/cli && npm install

# Copiar código fonte e gerar build com base-href /web/
COPY . .
RUN ng build --configuration production --base-href=/web/

# Etapa 2: Nginx
FROM nginx:1.27-alpine

# Limpar conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Criar pasta /web e copiar build Angular para ela
RUN mkdir -p /usr/share/nginx/html/web
COPY --from=build /app/dist/web-app/browser /usr/share/nginx/html/web

# Copiar conf Nginx customizada
COPY nginx.conf /etc/nginx/nginx.conf

# Testar sintaxe do Nginx
RUN nginx -t

EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]
