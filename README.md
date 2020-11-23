# Cards project

![Build status](https://github.com/drunkoders/cards-ui/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/drunkoders/cards-ui/badge.svg?branch=master)](https://coveralls.io/github/drunkoders/cards-ui?branch=master)

## @cardz/server

[Read about it here](./packages/server/README.md)

## Infrastructure

```bash
# start db infra
$ yarn start:db

# stop db infra
$ yarn stop:db

# clean db infra
$ yarn clean:db
```

After the running the DB infra, you can access the admin tool at: [http://localhost:8081](http://localhost:8081)

### Credentials

By default here are the following credentials:

- DB Admin user:
  - user: **root**
  - password: **rootpassword**
- Admin tool basic auth
  - user: **admin**
  - password: **admin**

You can change this configuration by creating a `.env` file from the [template](./.env-template)