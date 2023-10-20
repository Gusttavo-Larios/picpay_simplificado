import connection from "./database.connection";

connection.run(`
   create table if not exists people(
       id integer auto increment primary key,
       cpf varchar(14) not null unique,
       full_name varchar(56) not null,
       email varchar(96) not null unique,
       password varchar(96) not null
   );
`);

connection.run(`
   create table if not exists company(
        id integer auto increment primary key,
        cnpj varchar(18) not null unique,
        full_name varchar(56) not null,
        email varchar(96) not null unique,
        password varchar(96) not null
   );
`);

connection.run(`
    create table if not exists bank(
        id integer auto increment primary key,
        compe integer not null unique,
        name varchar(72)
    );
`);

connection.run(`
    create table if not exists account(
        id integer auto increment primary key,
        account_number varchar(10) not null unique,
        bank_id integer unsigned not null,
        constraint relation_account_bank foreign key (bank_id) references bank(id) 
    );
`);

connection.run(`
    create table if not exists assoc_people_account(
        people_id integer unsigned not null,
        account_id integer unsigned not null,
        foreign key (people_id) references people(id),
        foreign key (account_id) references account(id),
        primary key (people_id, account_id)
    );
`);

connection.run(`
    create table if not exists assoc_company_account(
        company_id integer unsigned not null,
        account_id integer unsigned not null,
        foreign key (company_id) references company(id),
        foreign key (account_id) references account(id),
        primary key (company_id, account_id)
    );
`);

connection.run(`
    create table if not exists released_transaction(
        id integer auto increment primary key, 
        origin_account_id integer unsigned not null,
        target_account_id integer unsigned not null,
        foreign key (origin_account_id) references account(id),
        foreign key (target_account_id) references account(id)
    );
`);
