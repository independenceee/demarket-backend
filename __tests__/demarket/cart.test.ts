// TESTCASE CART
import { StatusCodes } from "http-status-codes";
import request from "supertest";

const apiUrl = "https://demarket-backend.vercel.app";
const walletAddress = "addr_test1qzndmp8766ymgdsqkll9fq4tp63a0qey9q7le7g3wx4wu5d7080dwpufa65mkmh402unp4d4meyftg723gysz7mfnrqqfg09fs";
const accountId = "f1da746-2fb1-48c8-b0a7-b03f5007936b";

describe("CART API FROM DEMARKET", () => {
    it("Add to cart", (done) => {
        const data = {};
        request(apiUrl)
            .get(`/api/v1/account/other_account?walletAddress=${walletAddress}`)
            .send(data)
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

    it("Remove from cart", function (done) {
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
});
