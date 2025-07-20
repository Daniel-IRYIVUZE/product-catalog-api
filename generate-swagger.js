const fs = require('fs');
const swaggerSpec = require('./swagger.js');

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger JSON file generated successfully!');