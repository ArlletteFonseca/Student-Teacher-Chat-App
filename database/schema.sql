set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "messages" (
  "chatID" serial,
  "studentID" serial,
  "teacherID" serial,
  PRIMARY KEY ("chatID")
);

CREATE TABLE "teacher" (
  "teacherID" serial,
  "firstName" text,
  "lastName" text,
  "course" text,
  "password" text,
  "email" text,
  PRIMARY KEY ("teacherID")
);

CREATE TABLE "student" (
  "studentID" serial,
  "firstName" text,
  "lastName" text,
  "course" text,
  "password" text,
  "email" text,
  "gradeLevel" text,
  PRIMARY KEY ("studentID")
);

CREATE TABLE "contacts" (
  "studentID" serial,
  "teacherID" serial,
  PRIMARY KEY ("studentID", "teacherID")
);
