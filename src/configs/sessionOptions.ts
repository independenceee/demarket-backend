import RedisStore from "connect-redis";
import redis from "../databases/redis";

const sessionOption = {
    secret: "demarket",
    store: new RedisStore({ client: redis }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // http => https => true
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
    },
};

export default sessionOption;
