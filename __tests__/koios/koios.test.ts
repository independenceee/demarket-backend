import request from "supertest";

const apiUrl = "https://api.demarket.vn";

// Get all assets with wallet address
describe("Get all assets with wallet address", () => {
    it("When the address is correct and complete", (done) => {
        const postData = {
            address: "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshmzl0z",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/address-assets")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("When the address does not have an address", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/koios/assets/address-assets")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("when the address is not in the correct format", (done) => {
        const postData = {
            address: "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshmzl0",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/address-assets")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

// Retrieve the most recent active stakekeys
describe("Retrieve the most recent active stakekeys", () => {
    it("Retrieve the most recent active stakekeys", (done) => {
        request(apiUrl)
            .get("/api/v1/koios/assets/account-list")

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

// Retrieve the assets with policyId entered as above
describe("Retrieve the assets with policyId entered as above", () => {
    it("When the policyId is correct and complete", (done) => {
        const postData = {
            policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/policy-list")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("When the policyId does not have an address", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/koios/assets/policy-list")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("when the policyId is not in the correct format", (done) => {
        const postData = {
            policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d616e457af44",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/policy-list")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

// Get the general description of the asset knowing policyId and asset

describe("Get the general description of the asset knowing policyId and assetName", () => {
    it("When the policyId and assetName is correct and complete", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae",
            assetName: "486f736b794b69636b333133",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/summary")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("When the policyId and assetName does not have an address", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/koios/assets/summary")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("when the policyId and assetName is not in the correct format", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae",
            assetName: "486f736b794b69636b33133",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/summary")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

// Get a list of assets with the same policyId

describe("Get a list of assets with the same policyId", () => {
    it("When the policyId is correct and complete", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/assets-policy-information")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("When the policyId  does not have an address", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/koios/assets/assets-policy-information")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("when the policyId is not in the correct format", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d46ae",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/assets-policy-information")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

// Retrieve asset information when policyId and assetName are known

describe("Retrieve asset information when policyId and assetName are known", () => {
    it("When the  policyId and assetName  is correct and complete", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae",
            assetName: "486f736b794b69636b333133",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/assets-policy-information")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("When the  policyId and assetName   does not have an address", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/koios/assets/assets-policy-information")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("when the policyId and assetName is not in the correct format", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468a",
            assetName: "486f736b794b69636b3s31",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/assets-policy-information")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

// Get asset information when policyId and assetName are available

describe("Get asset information when policyId and assetName are available", () => {
    it("When the  policyId and assetName  is correct and complete", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae",
            assetName: "486f736b794b69636b333133",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/information")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("When the  policyId and assetName   does not have an address", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/koios/assets/information")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("when the policyId and assetName is not in the correct format", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae",
            assetName: "486f736b794b69636bs331",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/information")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

// Retrieve the address of the asset holding the asset when policyId and assetName are known

describe("Get asset information when policyId and assetName are available", () => {
    it("When the  policyId and assetName  is correct and complete", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae",
            assetName: "486f736b794b69636b333133",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/nft-address")
            .send(postData)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("When the  policyId and assetName   does not have an address", (done) => {
        const postData = {};
        request(apiUrl)
            .post("/api/v1/koios/assets/nft-address")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });

    it("when the policyId and assetName is not in the correct format", (done) => {
        const postData = {
            policyId: "06b913e3a939a9228b5f72ce08f488305e1907f2034d9fbb58d468ae",
            assetName: "486f736b794b69636b3331",
        };
        request(apiUrl)
            .post("/api/v1/koios/assets/nft-address")
            .send(postData)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});
