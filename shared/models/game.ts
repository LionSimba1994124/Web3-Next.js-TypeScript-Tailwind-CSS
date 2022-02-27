import { createModel } from "@rematch/core";
import { RootModel } from ".";

export enum GameStatus {
    WaitingPlayer,
    WaitingPick,
    OpponentPicked,
    RoundOver,
    GameOver
}

type GameState = {
    status: GameStatus;
};

export const game = createModel<RootModel>()({
    state: {
        status: GameStatus.WaitingPlayer
    } as GameState, // initial state
    reducers: {
        // handle state changes with pure functions
        setStatus(state, payload: number) {
            return {...state, status: payload}
        },
    },
    effects: (dispatch) => ({
    }),
});