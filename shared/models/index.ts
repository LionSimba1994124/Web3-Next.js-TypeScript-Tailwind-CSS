import { Models } from "@rematch/core";

import { account } from "./account";
import { round } from "./round";
import { game } from "./game";

export interface RootModel extends Models<RootModel> {
    account: typeof account;
    round: typeof round;
    game: typeof game;
}

export const models: RootModel = {
    account,
    round,
    game
};