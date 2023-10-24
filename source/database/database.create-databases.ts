import connection from "./database.connection";

connection.run(`
   create table if not exists people(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       cpf varchar(14) not null unique,
       full_name varchar(56) not null,
       email varchar(96) not null unique,
       password varchar(96) not null
   );
`);

connection.run(`
   create table if not exists company(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cnpj varchar(18) not null unique,
        full_name varchar(56) not null,
        email varchar(96) not null unique,
        password varchar(96) not null
   );
`);

connection.run(`
    create table if not exists bank(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        compe integer not null unique,
        name varchar(72)
    );
`);

connection.run(`
    create table if not exists account(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        origin_account_id integer unsigned not null,
        target_account_id integer unsigned not null,
        foreign key (origin_account_id) references account(id),
        foreign key (target_account_id) references account(id)
    );
`);

connection.run(`
        insert into bank (compe, name) values (001, 'Banco do Brasil S/A')
`);