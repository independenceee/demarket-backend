// TESTCASE ACCOUNT
import { StatusCodes } from "http-status-codes";
import request from "supertest";

const apiUrl = "https://api.demarket.vn";
const walletAddress = "addr_test1qzndmp8766ymgdsqkll9fq4tp63a0qey9q7le7g3wx4wu5d7080dwpufa65mkmh402unp4d4meyftg723gysz7mfnrqqfg09fs";
const accountId = "f1da746-2fb1-48c8-b0a7-b03f5007936b";

describe("ACCOUNT API FROM DEMARKET", () => {
    it("Get all account", (done) => {
        request(apiUrl)
            .get("/api/v1/account")
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    describe("Get other account when walletAddress.", function () {
        it("success", function (done) {
            const data = {};
            request(apiUrl)
                .get(`/api/v1/account/other_account?walletAddress=${walletAddress}`)
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
        it("No wallet address", function (done) {
            const data = {};
            request(apiUrl)
                .get(`/api/v1/account/other_account`)
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });

    describe("Get account by id.", function () {
        it("No id.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/account/id")
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
                .get(`/api/v1/account/${accountId}`)
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    describe("update account.", function () {
        it("success.", function (done) {
            const data = {
                email: "",
                userName: "",
                description: "",
                linkedin: "",
                telegram: "",
                twitter: "",
            };
            request(apiUrl)
                .patch(`/api/v1/account/${accountId}`)
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });

        it("No id or id incorrect.", function (done) {
            const data = {
                email: "",
                userName: "",
                description: "",
                linkedin: "",
                telegram: "",
                twitter: "",
            };
            request(apiUrl)
                .patch("/api/v1/account")
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });

    describe("Delete account.", function () {
        it("No id.", function (done) {
            request(apiUrl)
                .delete("/api/v1/account")
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
        it("success.", function (done) {
            request(apiUrl)
                .patch(`/api/v1/account/${accountId}`)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });
});
