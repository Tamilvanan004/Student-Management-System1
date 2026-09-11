CREATE DATABASE IF NOT EXISTS student_management_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE student_management_db;
CREATE TABLE IF NOT EXISTS students (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id VARCHAR(30) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  gender ENUM('Male','Female','Other') NOT NULL,
  department VARCHAR(50) NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  parent_name VARCHAR(100) NOT NULL,
  parent_phone VARCHAR(20) NOT NULL,
  address VARCHAR(500) NOT NULL,
  status ENUM('Active','Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id), UNIQUE KEY uq_students_student_id(student_id), UNIQUE KEY uq_students_email(email),
  KEY idx_students_department(department), KEY idx_students_year(academic_year), KEY idx_students_status(status)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS admins (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(160) NOT NULL,
  mobile VARCHAR(20) NULL,
  role VARCHAR(80) NOT NULL DEFAULT 'System Administrator',
  department VARCHAR(120) NULL,
  experience VARCHAR(80) NULL,
  office_address VARCHAR(500) NULL,
  about VARCHAR(500) NULL,
  password_salt VARCHAR(64) NOT NULL,
  password_hash VARCHAR(128) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id), UNIQUE KEY uq_admins_email(email)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS admin_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  admin_id INT UNSIGNED NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id), UNIQUE KEY uq_admin_sessions_token_hash(token_hash), KEY idx_admin_sessions_admin_id(admin_id), KEY idx_admin_sessions_expires_at(expires_at),
  CONSTRAINT fk_admin_sessions_admin FOREIGN KEY(admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB;
