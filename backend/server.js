require('dotenv').config();
const app=require('./app');
const db=require('./config/db');
const PORT=Number(process.env.PORT||5000);
async function start(){try{await db.query('SELECT 1');console.log('✅ Connected to MySQL Database');app.listen(PORT,()=>console.log(`✅ Server running on http://localhost:${PORT}`));}catch(error){console.error('❌ Unable to start server because the database connection failed.');console.error(error.message);process.exitCode=1;}}
start();
