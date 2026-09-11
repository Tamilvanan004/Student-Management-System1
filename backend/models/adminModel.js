const db = require('../config/db');
function publicAdmin(row){ if(!row) return null; return { id:row.id, full_name:row.full_name, email:row.email, mobile:row.mobile||'', role:row.role||'System Administrator', department:row.department||'', experience:row.experience||'', office_address:row.office_address||'', about:row.about||'' }; }
async function findByEmail(email){ const [rows]=await db.query('SELECT * FROM admins WHERE email = ? LIMIT 1',[email]); return rows[0]||null; }
async function findById(id){ const [rows]=await db.query('SELECT * FROM admins WHERE id = ? LIMIT 1',[id]); return rows[0]||null; }
async function findEmailConflict(email,excludeId){ const [rows]=await db.query('SELECT id FROM admins WHERE email = ? AND id <> ? LIMIT 1',[email,excludeId]); return Boolean(rows.length); }
async function createSession(adminId,tokenHash,expiresAt){ await db.query('INSERT INTO admin_sessions (admin_id, token_hash, expires_at) VALUES (?, ?, ?)',[adminId,tokenHash,expiresAt]); }
async function findBySessionTokenHash(tokenHash){ const [rows]=await db.query('SELECT a.* FROM admin_sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token_hash=? AND s.expires_at>NOW() LIMIT 1',[tokenHash]); return rows[0]||null; }
async function deleteSession(tokenHash){ await db.query('DELETE FROM admin_sessions WHERE token_hash = ?',[tokenHash]); }
async function deleteAllSessions(adminId){ await db.query('DELETE FROM admin_sessions WHERE admin_id = ?',[adminId]); }
async function deleteExpiredSessions(){ await db.query('DELETE FROM admin_sessions WHERE expires_at <= NOW()'); }
async function updateProfile(id,p){ const [result]=await db.query('UPDATE admins SET full_name=?, email=?, mobile=?, department=?, experience=?, office_address=?, about=? WHERE id=?',[p.full_name,p.email,p.mobile||null,p.department||null,p.experience||null,p.office_address||null,p.about||null,id]); return result; }
async function updatePassword(id,salt,hash){ const [result]=await db.query('UPDATE admins SET password_salt=?, password_hash=? WHERE id=?',[salt,hash,id]); return result; }
module.exports={publicAdmin,findByEmail,findById,findEmailConflict,createSession,findBySessionTokenHash,deleteSession,deleteAllSessions,deleteExpiredSessions,updateProfile,updatePassword};
