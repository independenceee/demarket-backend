// TESTCASE FOLLOW
import { StatusCodes } from "http-status-codes";
import request from "supertest";

const apiUrl = "https://api.demarket.vn";
const walletAddress = "addr_test1qzndmp8766ymgdsqkll9fq4tp63a0qey9q7le7g3wx4wu5d7080dwpufa65mkmh402unp4d4meyftg723gysz7mfnrqqfg09fs";
const accountId = "f1da746-2fb1-48c8-b0a7-b03f5007936b";

describe("FOLLOW API FROM DEMARKET", () => {
    describe("Get followed account when walletAddress.", function () {
        it("success", function (done) {
            const data = {};
            request(apiUrl)
                .get(`/api/v1/follow/followed?walletAddress=${walletAddress}`)
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
                .get(`/api/v1/follow/followed`)
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });

    describe("Get following account when wallet address.", function () {
        it("No wallet address.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/follow/folloing")
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
                .get(`/api/v1/follow/followed?walletAddress=${walletAddress}`)
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });

    describe("Follow.", function () {
        it("Success", function (done) {
            const data = {
                followingId: "4f1da746-2fb1-48c8-b0a7-b03f5007936b",
                followerId: "62944815-476a-4c94-bb95-f951f8e0ab98",
            };
            request(apiUrl)
                .post("/api/v1/follow")
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });

    describe("Follow.", function () {
        it("Success", function (done) {
            const data = {
                followingId: "4f1da746-2fb1-48c8-b0a7-b03f5007936b",
                followerId: "62944815-476a-4c94-bb95-f951f8e0ab98",
            };
            request(apiUrl)
                .delete("/api/v1/follow")
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
