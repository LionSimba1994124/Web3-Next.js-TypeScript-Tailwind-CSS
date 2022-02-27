import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/Connectors"

import { useSelector } from 'react-redux'
import { useRematchDispatch } from '../shared/utils'

import { RoundNumbers } from '../shared/models/round'

const Round: NextPage = () => {
    // const user = useSelector((state) => state.account)
    const { setAddress, setRoundStatus } = useRematchDispatch((dispatch: any) => ({
        setAddress: dispatch.account.setAddress,
        setRoundStatus: dispatch.round.setStatus
    }))

    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const router = useRouter()

    async function connect() {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

    function goRoom(round: number) {
        setRoundStatus(round)

        router.push({
            pathname: '/room',
            query: { id: (Math.random() + 1).toString(36).substring(7) },
        })
    }

    useEffect(() => {
        setAddress(account)
    }, [account])

    return (
        active ? (
            <div className="container mx-auto">
                <p className="text-4xl text-center mt-40">How many games before the winner is decided</p>
                <div className="mt-10 text-center">
                    <button onClick={() => goRoom(RoundNumbers.Three)} className="mt-5 py-10 mx-2 mb-4 text-lg font-bold rounded-lg w-56 bg-black text-white border-solid border-2 hover:bg-slate-800">Best of three</button>
                    <button onClick={() => goRoom(RoundNumbers.Five)} className="mt-5 py-10 mx-2 mb-4 text-lg font-bold rounded-lg w-56 bg-black text-white border-solid border-2 hover:bg-slate-800">Best of five</button>
                    <button onClick={() => goRoom(RoundNumbers.Ten)} className="mt-5 py-10 mx-2 mb-4 text-lg font-bold rounded-lg w-56 bg-black text-white border-solid border-2 hover:bg-slate-800">Best of ten</button>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center">
                <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold rounded-lg w-56 bg-black text-white border-solid border-2 hover:bg-slate-800">Login with Metamask</button>
                {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
                <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold rounded-lg w-56 bg-black text-white border-solid border-2 hover:bg-slate-800">Disconnect</button>
            </div>
        )
    )
}

export default Round
