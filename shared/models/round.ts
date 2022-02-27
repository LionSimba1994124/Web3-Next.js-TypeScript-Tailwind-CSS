import { createModel } from "@rematch/core";
import { RootModel } from ".";

export enum RoundStatus {
    None,
    Tie,
    Win,
    Lose
}

export enum RoundNumbers {
    Three = 3,
    Five = 5,
    Ten = 10
}

type RoundState = {
    status: RoundStatus,
    counts: RoundNumbers
};

export const round = createModel<RootModel>()({
    state: {
        status: RoundStatus.None
    } as RoundState, // initial state
    reducers: {
        // handle state changes with pure functions
        setRound(state, payload: number) {
            return {...state, counts: payload}
        },
        setStatus(state, payload: number) {
            return {...state, status: payload}
        }
    },
    effects: (dispatch) => ({
    }),
});