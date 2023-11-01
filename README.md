# picpay_simplificado

## Ferramentas utilizadas

- Typescript
- Bun
- Fastify
- SQLite


## Executar o projeto

Para executar o projeto:

```
./build-local.sh
```

## Documentação do projeto

**Para criar uma perfil do tipo pessoa**

```POST: http://127.0.0.1:3000/people```
```
{
    "full_name": "Nome de Teste",
    "cpf": "999.999.999-99",
    "email": "email@exemplo.com",
    "senha": "12345"
}
```

**Para criar uma perfil do tipo empresa**

```POST: http://127.0.0.1:3000/company```
```
{
    "full_name": "Nome de Teste",
    "cnpj": "99.999.999/9999-99",
    "email": "email@exemplo.com",
    "senha": "12345"
}
```

**Para criar uma conta bancaria**

```POST: http://127.0.0.1:3000/people/account```

```POST: http://127.0.0.1:3000/company/account```
```
{
    "ownerId": 1,
    "bank_id": 1
}
```

**Para realizar uma transação**

```POST: http://127.0.0.1:3000/people/transact```
```
{
    "originAccountId": 1,
    "recipientAccountId": 2,
    "amount": 100
}
```