## Comando obrigatório
## Baixa a imagem do node
FROM node

## Define o local onde o app vai ficar no disco do container
## Pode ser o diretório que eu quiser
WORKDIR /usr/app

## Copia tudo que começa com package e termina com .json para dentro da pasta /usr/app
COPY package.json ./

## Executa npm install para adicionar as dependências e criar a pasta node_modules
RUN npm install

## Copia tudo que está no diretório onde o arquivo Dockerfile está 
## para dentro da pasta /usr/app do container
COPY . .

## Container ficará ouvindo os acessos na porta 3333
EXPOSE 3333

## Não se repete no Dockerfile
## Executa o comando npm run dev para iniciar o script que que está no package.json
CMD ["npm", "run", "dev"] 
