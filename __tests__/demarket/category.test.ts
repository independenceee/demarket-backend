// TESTCASE CATEGORY

import { StatusCodes } from "http-status-codes";
import request from "supertest";

const apiUrl = "https://demarket-backend.vercel.app";

describe("CATEGORY API FROM DEMARKET", () => {
    it("Get all category", (done) => {
        request(apiUrl)
            .get("/api/v1/category")
            .expect(StatusCodes.OK)
            .end((err, res) => {
                if (err) {
                    console.log("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                console.log(res.body);
                done();
            });
    });

    describe("Get category by id.", function () {
        it("No id.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/category/id")
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
        it("Data success.", function (done) {
            const data = {};
            request(apiUrl)
                .get(`/api/v1/category/f799bc5f-45d8-46b1-828e-19f48628dcb9`)
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

    describe("Create category.", function () {
        it("No contract address.", function (done) {
            const data = {};
            request(apiUrl)
                .post("/api/v1/category")
                .send(data)
                .expect(StatusCodes.BAD_REQUEST)
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

        it("Check duplicate.", function (done) {
            const data = {
                name: "image",
            };
            request(apiUrl)
                .post("/api/v1/category")
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
        it("Data success.", function (done) {
            const data = {
                name: "description",
            };
            request(apiUrl)
                .get(`/api/v1/category`)
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

    describe("Update category.", function () {
        it("No id", function (done) {
            const data = {};
            request(apiUrl)
                .patch("/api/v1/category")
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
        it("Data success.", function (done) {
            const data = {
                name: "name",
            };
            request(apiUrl)
                .patch(`/api/v1/category`)
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
    });
});
