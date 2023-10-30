import * as dotenv from "dotenv";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
dotenv.config();

const apiBlockfrost = new BlockFrostAPI({
    projectId: "preprodaXBLgbqqCAo5wMCdB77sUusgmx2RcgtH",
});

export default apiBlockfrost;
