import { createModel } from "@rematch/core";
import { stat } from "fs";
import { RootModel } from ".";

export enum PlayerStatus {
    Piking,
    Rock,
    Paper,
    Scissors,
    Disconnected
}

type AccountState = {
    address: string,
    status: PlayerStatus,
    // roomInfo: RoomInfo,
    url: string,
    opponent: string,
    viewers: Array<string>
};

// type RoomInfo = {
//     url: string,
//     roomId: string,
// }

export const account = createModel<RootModel>()({
    state: {
        address: '',
        status: PlayerStatus.Piking,
        url: '',
        opponent: '',
        viewers: [],
        // roomInfo: {
        //     url: '',
        //     roomId: '',
        // } as RoomInfo,
    } as AccountState, // initial state
    reducers: {
        // handle state changes with pure functions
        setAddress(state, payload: string) {
            return {...state, address: payload}
        },
        setOpponent(state, payload: string) {
            return {...state, opponent: payload}
        },
        setStatus(state, payload: number) {
            return {...state, status: payload}
        },
        // setRoomInfo(state, payload: RoomInfo) {
        //     return {...state, roomInfo: payload}
        // },
        setUrl(state, payload: string) {
            return {...state, url: payload}
        },
    },
    effects: (dispatch) => ({
        // // handle state changes with impure functions.
        // // use async/await for async actions
        // async incrementAsync(payload: number, state) {
        //     console.log("This is current root state", state);
        //     await new Promise((resolve) => setTimeout(resolve, 1000));
        //     dispatch.count.increment(payload);
        // },
    }),
});