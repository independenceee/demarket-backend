// TESTCASE STATISTIC
import { StatusCodes } from "http-status-codes";
import request from "supertest";

const apiUrl = "https://api.demarket.vn";
const contractAddress = "addr_test1wpsqeugnmmtk3cdf3fsly998458eavua8rhg4jdtgcva26sqnylmx";

describe("STATISTICS API FROM DEMARKET", () => {
    it("Get total account", (done) => {
        request(apiUrl)
            .get("/api/v1/statistics/account")

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("Get total treding", (done) => {
        request(apiUrl)
            .get("/api/v1/statistics/trending")

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    describe("Get total transactions ", function () {
        it("No contract address.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/statistics/transaction")
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
                .get(`/api/v1/statistics/transaction?contractAddress=${contractAddress}`)
                .send(data)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    done();
                });
        });
    });

    describe("Get total product ", function () {
        it("No contract address.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/statistics/product")
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
                .get(`/api/v1/statistics/product?contractAddress=${contractAddress}`)
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
