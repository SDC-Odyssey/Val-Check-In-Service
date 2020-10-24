sudo -i -u postgres

You can now access a Postgres prompt immediately by typing:
psql or sudo -u postgres psql

Exit out of the PostgreSQL prompt by typing:
\q

To view the currently present databases:
\list or \l command

You must specify the database to use on connect; if you want to use psql for your script, you can use
\c name_database"

Use the \dt or \dt+ command in psql to show tables in a specific database.

inally, issue the command \d table_name or \d+ table_name to describe a table
