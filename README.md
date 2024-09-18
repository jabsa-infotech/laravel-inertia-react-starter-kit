# Laravel Starter Kit - Inertia with React
1. PHP - v8.3
2. Laravel - v11.x
3. React - v18.x
4. Database - **Sqlite** (default) (Of course You can use any db of your choice that laravel supports)

## Usases

### .env setup and create database
```
cp .env.example .env
touch database/database.sqlite
```

### Install dependencies
```
docker run --rm -v $(pwd):/opt -w /opt laravelsail/php83-composer:latest composer install

npm install
npm run dev
```

```
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail storage:link
./vendor/bin/sail artisan migrate:fresh --seed
```
