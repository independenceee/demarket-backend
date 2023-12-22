module.exports = {
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    preset: "ts-jest",
    testEnvironment: "node",
    testTimeout: 30000,
};
