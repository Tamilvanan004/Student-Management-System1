const DEPARTMENTS = ['AI & DS', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical'];
const YEARS = ['I Year', 'II Year', 'III Year', 'IV Year'];
const GENDERS = ['Male', 'Female', 'Other'];
const STATUSES = ['Active', 'Inactive'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9]{7,15}$/;
const STUDENT_ID_RE = /^[A-Za-z0-9][A-Za-z0-9/_-]{1,29}$/;
const text = (value) => String(value ?? '').trim();
const normalizePhone = (value) => text(value).replace(/[\s()-]/g, '');
function validateStudent(body = {}) {
  const value = { student_id: text(body.student_id).toUpperCase(), full_name: text(body.full_name), email: text(body.email).toLowerCase(), phone: normalizePhone(body.phone), gender: text(body.gender), department: text(body.department), academic_year: text(body.academic_year), dob: text(body.dob), parent_name: text(body.parent_name), parent_phone: normalizePhone(body.parent_phone), address: text(body.address), status: text(body.status) || 'Active' };
  const errors = [];
  if (!STUDENT_ID_RE.test(value.student_id)) errors.push('Student ID must be 2 to 30 characters and use only letters, numbers, /, _ or -.');
  if (value.full_name.length < 2 || value.full_name.length > 100) errors.push('Student name must be 2 to 100 characters.');
  if (!EMAIL_RE.test(value.email) || value.email.length > 160) errors.push('Enter a valid student email address.');
  if (!PHONE_RE.test(value.phone)) errors.push('Enter a valid student phone number.');
  if (!GENDERS.includes(value.gender)) errors.push('Select a valid gender.');
  if (!DEPARTMENTS.includes(value.department)) errors.push('Select a valid department.');
  if (!YEARS.includes(value.academic_year)) errors.push('Select a valid academic year.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value.dob) || Number.isNaN(Date.parse(value.dob))) errors.push('Enter a valid date of birth.'); else { const date = new Date(`${value.dob}T00:00:00Z`); const now = new Date(); if (date > now) errors.push('Date of birth cannot be in the future.'); }
  if (value.parent_name.length < 2 || value.parent_name.length > 100) errors.push('Parent/guardian name must be 2 to 100 characters.');
  if (!PHONE_RE.test(value.parent_phone)) errors.push('Enter a valid parent/guardian phone number.');
  if (value.address.length < 5 || value.address.length > 500) errors.push('Address must be 5 to 500 characters.');
  if (!STATUSES.includes(value.status)) errors.push('Select a valid status.');
  return { valid: errors.length === 0, errors, value };
}
function parseListQuery(query = {}) { const page = Math.max(1, Number.parseInt(query.page, 10) || 1); const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 10)); const department = text(query.department); const year = text(query.year); const status = text(query.status); return { search: text(query.search).slice(0, 100), department: DEPARTMENTS.includes(department) ? department : '', year: YEARS.includes(year) ? year : '', status: STATUSES.includes(status) ? status : '', page, limit }; }
module.exports = { validateStudent, parseListQuery, DEPARTMENTS, YEARS, GENDERS, STATUSES };
