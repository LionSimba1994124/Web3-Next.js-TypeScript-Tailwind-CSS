import React, { useState, useEffect, useContext } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
// import { io } from "socket.io-client";
import {SocketContext} from '../shared/context/socket';

import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/Connectors"

import { useSelector } from 'react-redux'
import { useRematchDispatch } from '../shared/utils'

import { HeaderPanel } from "../components/panel/HeaderPanel";
import { GamePanel } from "../components/panel/GamePanel";
import { ViewPanel } from "../components/panel/ViewPanel";
import { PlayerStatus } from '../shared/models/account';
import { GameStatus } from '../shared/models/game';
import { RoundStatus } from '../shared/models/round';

type Props = { host: string | null };
export const getServerSideProps: GetServerSideProps<Props> =
    async context => ({ props: { host: context.req.headers.host || null } });

const Room: NextPage<Props> = (context: Props) => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const router = useRouter()
    const roomId = router.query.id
    const url = "https://" + context.host + router.asPath

    const socket = useContext(SocketContext);

    const { address } = useSelector((state: any) => ({
        address: state.account.address
    }))

    const {
        setAddress,
        setGameStatus,
        setOpponent,
        setPlayerStatus,
        setUrl,
    } = useRematchDispatch((dispatch: any) => ({
        setAddress: dispatch.account.setAddress,
        setGameStatus: dispatch.game.setStatus,
        setOpponent: dispatch.account.setOpponent,
        setPlayerStatus: dispatch.account.setStatus,
        // setRoomInfo: dispatch.account.setRoomInfo,
        setUrl: dispatch.account.setUrl,
    }))

    async function connect() {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    useEffect(() => {
        setAddress(account)
    }, [account])


    useEffect(() => {
        // setRoomInfo({url, roomId})
        setUrl(url)

    }, [url])

    useEffect(() => {
        if(address != '' && address != null) socket.emit("new_player", roomId, address)
        // socket.on("connect", () => {
        //     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        //     if(address != '' && address != null) socket.emit("new_player", roomId, address)
        // });

        socket.on("joined", (address: any) => {
            console.log("joined - ", address); // world
            // setPlayerStatus(PlayerStatus.)
            setOpponent(address)
            setGameStatus(GameStatus.WaitingPick)
        });

        socket.on("disconnect", () => {
            console.log(socket.id); // undefined
        });
    }, [address])

    return (
        active ? (
        <div className="container mx-auto">
            <HeaderPanel />
            <div className='flex flex-row mt-5'>
                <div className='relative basis-7/12 border-2 rounded-lg h-96'>
                    <GamePanel />
                </div>
                <div className='basis-5/12 rounded-lg ml-3'>
                    <ViewPanel />
                </div>
            </div>
            {/* <p className="text-4xl text-center mt-40">{ gameStatus + " " + " " + roundStatus + " " + playerStatus }</p> */}
        </div>
        ) : (
            <div className="flex flex-col items-center justify-center">
                <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold rounded-lg w-56 bg-black text-white border-solid border-2 hover:bg-slate-800">Login with Metamask</button>
                {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
            </div>
        )
    )
}

export default Room
