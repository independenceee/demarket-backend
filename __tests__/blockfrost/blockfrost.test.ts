import request from "supertest";

const apiUrl = "https://api.demarket.vn";

// Get asset information when policyId and assetName are known
describe("Get asset information when policyId and assetName are known", () => {
    it("When the address is correct and complete", (done) => {
        const postData = {
            policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44",
            assetName: "4461696c7920436f696e",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/assets/information")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when there is no policyId and assetName", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/blockfrost/assets/information")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when the policyId and assetName is not in the correct format", (done) => {
        const postData = {
            policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af4",
            assetName: "4461696c7920436f696e",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/assets/information")
            .send(postData)
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

// List all assets when minting with the above policyId
describe("List all assets when minting with the above policyId", () => {
    it("When the policyId is correct and complete", (done) => {
        const postData = {
            policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/assets/information")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when there is no policyId", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/blockfrost/assets/information")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when the policyId is not in the correct format", (done) => {
        const postData = {
            policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af4",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/assets/information")
            .send(postData)

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

// List all assets when stakeAddress is present
describe("List all assets when stakeAddress is present", () => {
    it("When the stakeAddress is correct and complete", (done) => {
        const postData = {
            stakeAddress: "stake_test1uq0d2z452v4textws5srssmadtw7gkv8av865wgk3evyfmcy8cela",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/assets/address")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when there is no stakeAddress", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/blockfrost/assets/address")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when the stakeAddress is not in the correct format", (done) => {
        const postData = {
            stakeAddress: "stake_test1uq0d2z452v4textws5srssmadtw7gkv8av865wgk3evyfmcy8cel",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/assets/address")
            .send(postData)

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

// Get transaction description information when transactionHash is available
describe("Get transaction description information when transactionHash is available", () => {
    it("When the transactionHash is correct and complete", (done) => {
        const postData = {
            transactionHash: "733c16802b3d84c065a875166233cbb6a76ca0a85e59f0b2bcea8b70e26d5539",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/transaction/utxos")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when there is no transactionHash", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/blockfrost/transaction/utxos")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when the transactionHash is not in the correct format", (done) => {
        const postData = {
            transactionHash: "733c16802b3d84c065a875166233cbb6a76ca0a85e59f0b2bcea8b70e26d553",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/transaction/utxos")
            .send(postData)

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

// Returns all transaction information for the address
describe("Returns all transaction information for the address", () => {
    it("When the address is correct and complete", (done) => {
        const postData = {
            address: "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshmzl0z",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/transaction/account")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when there is no address", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/blockfrost/transaction/account")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when the address is not in the correct format", (done) => {
        const postData = {
            address: "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshml0z",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/transaction/account")
            .send(postData)

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

// Retrieve asset transaction information when knowing policyId and assetName
describe("Retrieve asset transaction information when knowing policyId and assetName", () => {
    it("When the policyId and assetName is correct and complete", (done) => {
        const postData = {
            policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44",
            assetName: "4461696c7920436f696e",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/transaction/asset")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when there is no policyId and assetName", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/blockfrost/transaction/asset")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    console.error("Test failed with error:", err);
                    console.log("Response body:", res.body);
                    return done(err);
                }
                done();
            });
    });

    it("when the policyId and assetName is not in the correct format", (done) => {
        const postData = {
            policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44",
            assetName: "4461696c7920436f696",
        };
        request(apiUrl)
            .post("/api/v1/blockfrost/transaction/asset")
            .send(postData)

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
