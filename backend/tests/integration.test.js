const test = require('node:test');
const assert = require('node:assert/strict');

if (process.env.RUN_INTEGRATION_TESTS !== '1') {
  test('integration tests are disabled outside CI/database environments', { skip: true }, () => {});
} else {
  const app = require('../app');
  const db = require('../config/db');

  let server;
  let baseUrl;
  let token;
  let studentId;

  async function api(path, options = {}) {
    const headers = { Accept: 'application/json', ...(options.headers || {}) };
    if (options.body) headers['Content-Type'] = 'application/json';
    if (token && options.auth !== false) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
    const body = await response.json();
    return { response, body };
  }

  test.before(async () => {
    await db.query('DELETE FROM admin_sessions');
    await db.query("DELETE FROM students WHERE student_id LIKE 'CI-%'");
    await new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const address = server.address();
        baseUrl = `http://127.0.0.1:${address.port}/api`;
        resolve();
      });
    });
  });

  test.after(async () => {
    if (studentId) await db.query('DELETE FROM students WHERE id = ?', [studentId]);
    await db.query("DELETE FROM students WHERE student_id LIKE 'CI-%'");
    await new Promise((resolve) => server.close(resolve));
    await db.end();
  });

  test('health endpoint confirms real MySQL connectivity', async () => {
    const { response, body } = await api('/health', { auth: false });
    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.database, 'connected');
  });

  test('protected student endpoint rejects unauthenticated requests', async () => {
    const response = await fetch(`${baseUrl}/students`);
    const body = await response.json();
    assert.equal(response.status, 401);
    assert.equal(body.success, false);
  });

  test('administrator can login with seeded credentials', async () => {
    const { response, body } = await api('/auth/login', {
      auth: false,
      method: 'POST',
      body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, remember: false })
    });
    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.ok(body.token);
    token = body.token;
  });

  test('authenticated CRUD flow works against MySQL', async () => {
    const unique = Date.now();
    const student = {
      student_id: `CI-${String(unique).slice(-8)}`,
      full_name: 'CI Test Student',
      email: `ci-${unique}@example.com`,
      phone: '9876543210',
      gender: 'Male',
      department: 'AI & DS',
      academic_year: 'III Year',
      dob: '2005-01-15',
      parent_name: 'CI Test Parent',
      parent_phone: '9876543211',
      address: 'Chennai, Tamil Nadu',
      status: 'Active'
    };
    const created = await api('/students', { method: 'POST', body: JSON.stringify(student) });
    assert.equal(created.response.status, 201);
    assert.equal(created.body.success, true);
    studentId = created.body.data.id;

    const listed = await api('/students?search=CI%20Test&department=AI%20%26%20DS&year=III%20Year&page=1&limit=10');
    assert.equal(listed.response.status, 200);
    assert.ok(listed.body.pagination.total >= 1);
    assert.ok(listed.body.data.some((row) => row.id === studentId));

    const fetched = await api(`/students/${studentId}`);
    assert.equal(fetched.response.status, 200);
    assert.equal(fetched.body.data.student_id, student.student_id);

    const updatedPayload = { ...student, full_name: 'CI Updated Student', status: 'Inactive' };
    const updated = await api(`/students/${studentId}`, { method: 'PUT', body: JSON.stringify(updatedPayload) });
    assert.equal(updated.response.status, 200);
    assert.equal(updated.body.data.full_name, 'CI Updated Student');
    assert.equal(updated.body.data.status, 'Inactive');

    const duplicate = await api('/students', { method: 'POST', body: JSON.stringify(updatedPayload) });
    assert.equal(duplicate.response.status, 409);

    const summary = await api('/students/stats/summary');
    assert.equal(summary.response.status, 200);
    assert.equal(typeof summary.body.data.total, 'number');
    assert.equal(typeof summary.body.data.inactive, 'number');

    const deleted = await api(`/students/${studentId}`, { method: 'DELETE' });
    assert.equal(deleted.response.status, 200);
    studentId = null;

    const missing = await api(`/students/${created.body.data.id}`);
    assert.equal(missing.response.status, 404);
  });

  test('admin profile can be read and logout invalidates the session', async () => {
    const me = await api('/auth/me');
    assert.equal(me.response.status, 200);
    assert.equal(me.body.data.email, process.env.ADMIN_EMAIL.toLowerCase());
    const logout = await api('/auth/logout', { method: 'POST' });
    assert.equal(logout.response.status, 200);
    const afterLogout = await api('/auth/me');
    assert.equal(afterLogout.response.status, 401);
  });
}
