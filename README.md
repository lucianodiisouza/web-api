# What is this project

This is the project of an RESTful API built with Node + Express for persist "spoilers" at database (mysql)

# Install
Inside this project maybe you dont find a node_modules directory, this is responsible for store all web-api dependences. Generally, one Node project is distributed by this way because de node_modules directory is so big. To obtain this how you really need, just type:

npm install 

(make sure that you have NodeJS already installed);

By this way the package.json file will be read and all dependencies of this project will be installed like are described at dependencies file.

# Endpoints 

GET /api/spoilers

GET /api/spoilers/1

GET /api/spoilers/?limite=10&pagina=1

GET /api/spoilers/?limite=1&pagina='1=1' (error)

POST /api/spoilers

PUT /api/spoilers/1

DELETE /api/spoilers/1

# Observations
if you pass true value at "sequelize sync({ force: true})" everytime that you starts (just type 'node .')  all tables in database will be dropped and new instances of the same tables will be created withou the previous data. Use this parameter just at the first run, and set de force for false.