// TESTCASE FOUNDER
import * as dotenv from "dotenv";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

dotenv.config();

describe("FOUNDER API FROM DEMARKET", function () {
    const apiUrl = "https://api.demarket.vn";

    describe("Get all founder", function () {
        it("Get all founders.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/founders")
                .send(data)

                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

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

                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
        it("When id is exactly.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/founders/2a35e521-e5d1-4756-8bbe-dff6e675e3d9")
                .send(data)

                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

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
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

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
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
        it("Update founder success.", function (done) {
            const data = { firstName: "firstName", lastName: "lastName", role: "role", company: "company", linkedin: "", twitter: "", telegram: "" };
            request(apiUrl)
                .patch("/api/v1/founders/2a35e521-e5d1-4756-8bbe-dff6e675e3d9")
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

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
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
        it("Delete founder success.", function (done) {
            const data = {};
            request(apiUrl)
                .patch("/api/v1/founders/2a35e521-e5d1-4756-8bbe-dff6e675e3d9")
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });
});
