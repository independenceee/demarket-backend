import request from "supertest";

const apiUrl = "https://demarket-backend.vercel.app";

describe("API Tests", () => {
    it("should return a 404 status for the root path", (done) => {
        request(apiUrl)
            .get("/")
            .expect(404)
            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });
});
