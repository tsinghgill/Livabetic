var pg = require('pg');
var connectionString = 'postgres://localhost:5432/livabetic';

var client = new pg.Client(connectionString);
client.connect();