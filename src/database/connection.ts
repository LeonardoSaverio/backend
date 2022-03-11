import { createConnection } from 'typeorm';

createConnection().then(()=> console.log('🎲️ Sucessfully connected with database'));