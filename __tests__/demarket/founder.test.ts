import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect, assert } from "chai";
import * as dotenv from "dotenv";

dotenv.config();

describe("FOUNDER", function () {
    const apiUrl = process.env.DEMARKET_BACKEND_API_RPC_URL!;

    beforeEach(function () {
        console.log(apiUrl);
    });

    describe("Get all founder", function () {
        it("", function (done) {
            const data = {};
            request(apiUrl)
                .post("/api/v1/founder")
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

    
});
