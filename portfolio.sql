CREATE TABLE IF NOT EXISTS portfolio (
    id SERIAL PRIMARY KEY NOT NULL,
    quota text[][] not null,
    create_date timestamp NOT NULL,
    update_date timestamp NOT NULL
);

INSERT INTO portfolio VALUES(default, '{{"name","50"},{"name1","300"},{"name2","900"}}', now(), now());