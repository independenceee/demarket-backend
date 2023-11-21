import request from "supertest";

const apiUrl: string = "https://demarket-backend.vercel.app";

// Account
describe("Get stakekey from address", () => {
    it("When the address is correct and complete", (done) => {
        const postData = {
            address: "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshmzl0z",
        };
        request(apiUrl)
            .post("/api/v1/emurgo/stakekey/address")
            .send(postData)
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

    it("When the address does not have an address", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/emurgo/stakekey/address")
            .send(postData)
            .expect(400)
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

    it("when the address is not in the correct format", (done) => {
        const postData = {
            address: "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshmzl0",
        };
        request(apiUrl)
            .post("/api/v1/emurgo/stakekey/address")
            .send(postData)
            .expect(500)
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
