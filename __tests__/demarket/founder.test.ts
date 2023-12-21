import * as dotenv from "dotenv";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

dotenv.config();

describe("FOUNDER", function () {
    const apiUrl = process.env.DEMARKET_BACKEND_API_RPC_URL!;
    describe("Get all founder", function () {
        it("Get all founder.", function (done) {
            const data = {};
            request(apiUrl)
                .post("/api/v1/founders")
                .send(data)
                .expect(StatusCodes.INTERNAL_SERVER_ERROR)
                .end((error, response) => {
                    if (error) {
                        console.error("Test failed with error:", error);
                        console.log("Response body:", response.body);
                        return done(error);
                    }
                    console.log(response.body);
                    done();
                });
        });
    });

    describe("Get founder by id", function () {});
    describe("Create founder", function () {});
    describe("Update founder by id", function () {});
    describe("Delete founder by id", function () {});
});
