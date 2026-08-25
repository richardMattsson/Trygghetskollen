import { Request, Response } from "express";
import { client } from "../db/connection";

export async function getTest() {
  try {
    const { rows } = await client.query("SELECT * FROM testQuestion;");
    return rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getTestSms() {
  try {
    const { rows } = await client.query("SELECT * FROM testQuestion;");
    return rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getTestPhone() {
  try {
    const { rows } = await client.query("SELECT * FROM testQuestionPhone;");
    return rows;
  } catch (err) {
    console.log(err);
  }
}
