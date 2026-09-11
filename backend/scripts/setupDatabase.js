require('dotenv').config();
const fs=require('fs');
const path=require('path');
const mysql=require('mysql2/promise');
async function main(){const missing=['DB_HOST','DB_USER'].filter((key)=>!process.env[key]);if(missing.length)throw new Error(`Missing environment variables: ${missing.join(', ')}`);const connection=await mysql.createConnection({host:process.env.DB_HOST,port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER,password:process.env.DB_PASSWORD||'',multipleStatements:true});const schema=fs.readFileSync(path.join(__dirname,'..','db','schema.sql'),'utf8');await connection.query(schema);await connection.end();console.log('✅ Database schema is ready.');}
main().catch((error)=>{console.error(`❌ Database setup failed: ${error.message}`);process.exitCode=1;});
