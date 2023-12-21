import request from "supertest";

const apiUrl = "https://demarket-backend.vercel.app";

describe("Get Statictis from demaket", () => {
    it("Get statictis from address", (done) => {
        request(apiUrl)
            .get("/api/v1/statistics")
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                console.log(res.body);
                done();
            });
    });
});
