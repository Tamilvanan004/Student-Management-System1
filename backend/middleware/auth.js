const Admin = require('../models/adminModel');
const { hashToken } = require('../utils/password');
async function requireAuth(req,res,next){ try { const header=req.get('authorization')||''; const match=header.match(/^Bearer\s+(.+)$/i); if(!match) return res.status(401).json({success:false,message:'Authentication required.'}); const tokenHash=hashToken(match[1]); const admin=await Admin.findBySessionTokenHash(tokenHash); if(!admin) return res.status(401).json({success:false,message:'Session expired. Please login again.'}); req.admin=admin; req.authTokenHash=tokenHash; next(); } catch(error){ next(error); } }
module.exports=requireAuth;
