// TESTCASE STATISTIC
import { StatusCodes } from "http-status-codes";
import request from "supertest";

const apiUrl = "https://demarket-backend.vercel.app";
const contractAddress = "addr_test1wpsqeugnmmtk3cdf3fsly998458eavua8rhg4jdtgcva26sqnylmx";

describe("STATISTICS API FROM DEMARKET", () => {
    it("Get total account", (done) => {
        request(apiUrl)
            .get("/api/v1/statistics/account")
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

    it("Get total treding", (done) => {
        request(apiUrl)
            .get("/api/v1/statistics/trending")
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

    describe("Get total transactions ", function () {
        it("No contract address.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/statistics/transaction")
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
        it("Data success.", function (done) {
            const data = {};
            request(apiUrl)
                .get(`/api/v1/statistics/transaction?contractAddress=${contractAddress}`)
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

    describe("Get total product ", function () {
        it("No contract address.", function (done) {
            const data = {};
            request(apiUrl)
                .get("/api/v1/statistics/product")
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
        it("Data success.", function (done) {
            const data = {};
            request(apiUrl)
                .get(`/api/v1/statistics/product?contractAddress=${contractAddress}`)
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
});
