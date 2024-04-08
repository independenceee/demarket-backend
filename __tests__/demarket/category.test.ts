// TESTCASE CATEGORY

import { StatusCodes } from "http-status-codes";
import request from "supertest";

const apiUrl = "https://api.demarket.vn";

describe("CATEGORY API FROM DEMARKET", () => {
    it("Get all category", (done) => {
        request(apiUrl)
            .get("/api/v1/category")

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    describe("Get category by id.", function () {
        it("No id.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/category/id")
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
        it("Data success.", function (done) {
            const data = {};
            request(apiUrl)
                .get(`/api/v1/category/f799bc5f-45d8-46b1-828e-19f48628dcb9`)
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

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
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

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
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
        it("Data success.", function (done) {
            const data = {
                name: "description",
            };
            request(apiUrl)
                .post(`/api/v1/category`)
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

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
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

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
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });

    describe("Delete category.", function () {
        it("No id", function (done) {
            request(apiUrl)
                .delete("/api/v1/category")
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
        it("Data success.", function (done) {
            request(apiUrl)
                .delete(`/api/v1/category`)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });
});
