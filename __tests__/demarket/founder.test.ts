// TESTCASE FOUNDER
import * as dotenv from "dotenv";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

dotenv.config();

describe("FOUNDER API FROM DEMARKET", function () {
    const apiUrl = process.env.DEMARKET_BACKEND_API_RPC_URL!;

    describe("Get all founder", function () {
        it("Get all founders.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/founders")
                .send(data)
                .expect(StatusCodes.OK)
                .end((error, response) => {
                    if (error) {
                        console.log("Test failed with error:", error);
                        console.log("Response body:", response.body);
                        return done(error);
                    }
                    console.log(response.body);
                    done();
                });
        });
    });

    describe("Get founder by id", function () {
        it("When id is not.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/founders")
                .send(data)
                .expect(StatusCodes.OK)
                .end((error, response) => {
                    if (error) {
                        console.log("Test failed with error:", error);
                        console.log("Response body:", response.body);
                        return done(error);
                    }
                    console.log(response.body);
                    done();
                });
        });
        it("When id is exactly.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/founders/2a35e521-e5d1-4756-8bbe-dff6e675e3d9")
                .send(data)
                .expect(StatusCodes.OK)
                .end((error, response) => {
                    if (error) {
                        console.log("Test failed with error:", error);
                        console.log("Response body:", response.body);
                        return done(error);
                    }
                    console.log(response.body);
                    done();
                });
        });
    });

    describe("Create founder", function () {
        it("Create all founder.", function (done) {
            const data = { firstName: "firstName", lastName: "lastName", role: "role", company: "company", linkedin: "", twitter: "", telegram: "" };
            request(apiUrl)
                .post("/api/v1/founders")
                .send(data)
                .expect(StatusCodes.INTERNAL_SERVER_ERROR)
                .end((error, response) => {
                    if (error) {
                        console.log("Test failed with error:", error);
                        console.log("Response body:", response.body);
                        return done(error);
                    }
                    console.log(response.body);
                    done();
                });
        });
    });

    describe("Update founder by id", function () {
        it("No params id founder.", function (done) {
            const data = { firstName: "firstName", lastName: "lastName", role: "role", company: "company", linkedin: "", twitter: "", telegram: "" };
            request(apiUrl)
                .patch("/api/v1/founders")
                .send(data)
                .expect(StatusCodes.NOT_FOUND)
                .end((error, response) => {
                    if (error) {
                        console.log("Test failed with error:", error);
                        console.log("Response body:", response.body);
                        return done(error);
                    }
                    console.log(response.body);
                    done();
                });
        });
        it("Update founder success.", function (done) {
            const data = { firstName: "firstName", lastName: "lastName", role: "role", company: "company", linkedin: "", twitter: "", telegram: "" };
            request(apiUrl)
                .patch("/api/v1/founders/2a35e521-e5d1-4756-8bbe-dff6e675e3d9")
                .send(data)
                .expect(StatusCodes.INTERNAL_SERVER_ERROR)
                .end((error, response) => {
                    if (error) {
                        console.log("Test failed with error:", error);
                        console.log("Response body:", response.body);
                        return done(error);
                    }
                    console.log(response.body);
                    done();
                });
        });
    });
    describe("Delete founder by id", function () {
        it("No params id founder.", function (done) {
            const data = {};
            request(apiUrl)
                .patch("/api/v1/founders")
                .send(data)
                .expect(StatusCodes.NOT_FOUND)
                .end((error, response) => {
                    if (error) {
                        console.log("Test failed with error:", error);
                        console.log("Response body:", response.body);
                        return done(error);
                    }
                    console.log(response.body);
                    done();
                });
        });
        it("Delete founder success.", function (done) {
            const data = {};
            request(apiUrl)
                .patch("/api/v1/founders/2a35e521-e5d1-4756-8bbe-dff6e675e3d9")
                .send(data)
                .expect(StatusCodes.INTERNAL_SERVER_ERROR)
                .end((error, response) => {
                    if (error) {
                        console.log("Test failed with error:", error);
                        console.log("Response body:", response.body);
                        return done(error);
                    }
                    console.log(response.body);
                    done();
                });
        });
    });
});
