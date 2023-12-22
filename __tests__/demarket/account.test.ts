// TESTCASE ACCOUNT
import { StatusCodes } from "http-status-codes";
import request from "supertest";

const apiUrl = "https://demarket-backend.vercel.app";
const walletAddress = "addr_test1qzndmp8766ymgdsqkll9fq4tp63a0qey9q7le7g3wx4wu5d7080dwpufa65mkmh402unp4d4meyftg723gysz7mfnrqqfg09fs";
const accountId = "f1da746-2fb1-48c8-b0a7-b03f5007936b";

describe("ACCOUNT API FROM DEMARKET", () => {
    it("Get all account", (done) => {
        request(apiUrl)
            .get("/api/v1/account")
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

    describe("Get other account when walletAddress.", function () {
        it("success", function (done) {
            const data = {};
            request(apiUrl)
                .get(`/api/v1/account/other_account?walletAddress=${walletAddress}`)
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
        it("No wallet address", function (done) {
            const data = {};
            request(apiUrl)
                .get(`/api/v1/account/other_account`)
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
    });

    describe("Get account by id.", function () {
        it("No id.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/account/id")
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
                .get(`/api/v1/account/${accountId}`)
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

    describe("Delete account.", function () {
        it("No id.", function (done) {
            request(apiUrl)
                .delete("/api/v1/account")
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
        it("success.", function (done) {
            request(apiUrl)
                .patch(`/api/v1/account/${accountId}`)
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
