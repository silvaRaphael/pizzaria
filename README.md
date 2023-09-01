# Sistema para Pizzaria

- #### Para instalar as configurar as variaveis e dependências execute os seguintes comandos:

```
  cp .env.example .env
  npm install
```

- #### Configure as variaveis do banco de dados e execute os seguintes comandos:

```
  npx prisma generate
  npx prisma migrate dev --name setup
```

- #### Para iniciar o servidor de desenvolvimento execute o comando:

```
  npm run dev
```

- #### Para iniciar o servidor de produção execute os seguintes comandos:

```
  npm run build
  npm start
```

- #### Para testar execute os seguintes comandos:

```
  npm run test
  npm run test:e2e
```

#### ou

```
  npm run test:e2e
```

#### com o servidor rodando para testar os endpoints
