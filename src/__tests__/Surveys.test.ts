import request from "supertest";
import { app } from "../app";
import { getConnection } from "typeorm";

import createConnection from '../database';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Sould be able to create a survey", async () => {
        const response = await request(app)
            .post("/surveys").send({
                title: "Teste Pesquisa",
                description: "Teste criação da pesquisa"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Sould be able get all surveys", async () => {
        const response = await request(app).get("/surveys");
        expect(response.body.length).toBe(1);
    });
});