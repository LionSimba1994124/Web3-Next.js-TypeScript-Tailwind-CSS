import { useContext, useEffect } from 'react'
import type { NextPage } from 'next'

import {SocketContext} from '../../shared/context/socket';

import { useSelector } from 'react-redux'
import { useRematchDispatch } from '../../shared/utils'
import { io } from "socket.io-client";

import Rock from '../Rock'
import Paper from '../Paper'
import Scissors from '../Scissors'

import { GameStatus } from '../../shared/models/game'
import { PlayerStatus } from '../../shared/models/account'
import { RoundStatus } from '../../shared/models/round'
import { RootModel } from '../../shared/models'

export const GamePanel: NextPage = () => {
  const socket = useContext(SocketContext);

  const { gameStatus, playerStatus, roundStatus } = useSelector((state: any) => ({
    gameStatus: state.game.status,
    playerStatus: state.account.status,
    roundStatus: state.round.status
  }))

  const { setPlayerStatus, setGameStatus } = useRematchDispatch((dispatch: any) => ({
    setGameStatus: dispatch.game.setStatus,
    setPlayerStatus: dispatch.account.setStatus,
}))

  function pick(playerStatus: PlayerStatus) {
    setPlayerStatus(playerStatus)

    socket.emit('picked', playerStatus)
  }

  useEffect(() => {
    socket.on('picked', (playerStatus: PlayerStatus) => {
      console.log('picked - ', playerStatus)
      setGameStatus(GameStatus.OpponentPicked)
    })
  })

  return (
    <>
        {/* <div className='text-center'>
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24"></svg>
        </div> */}
        { gameStatus == GameStatus.WaitingPlayer ? (
          <p className='text-4xl text-center mt-40'>Waiting Player</p>
        ) : gameStatus == GameStatus.WaitingPick || gameStatus == GameStatus.OpponentPicked ? (
          <>
            { gameStatus == GameStatus.WaitingPick && <p className='text-2xl text-center'>Opponent are picking...</p>}
            { gameStatus == GameStatus.OpponentPicked && <p className='text-2xl text-center'>Opponent Picked!</p>}
            <div className='absolute bottom-0 left-0 w-full'>
              <div className='text-center'>
                  { playerStatus == PlayerStatus.Rock     && <button><Rock /></button>}
                  { playerStatus == PlayerStatus.Paper    && <button><Paper /></button>}
                  { playerStatus == PlayerStatus.Scissors && <button><Scissors /></button>}
              </div>
              <div className='flex flex-row text-3xl border-2 rounded-lg'>
                  <div className='basis-4/12 border-2 rounded-lg'>Pick a Hand</div>
                  <button onClick={ () => pick(PlayerStatus.Rock) } className='basis-3/12 text-center hover:bg-slate-800 border-r-2'>Rock</button>
                  <button onClick={ () => pick(PlayerStatus.Paper) } className='basis-3/12 text-center hover:bg-slate-800 border-r-2'>Paper</button>
                  <button onClick={ () => pick(PlayerStatus.Scissors) } className='basis-3/12 text-center hover:bg-slate-800'>Scissors</button>
              </div>
            </div>
          </>
        ) : gameStatus == GameStatus.RoundOver ? (
          <>
            { (roundStatus == RoundStatus.None) && "" }
            { (roundStatus == RoundStatus.Tie) && (<p className='absolute text-4xl mt-40'>Tie</p>) }
            { (roundStatus == RoundStatus.Win) && (<p className='absolute text-4xl mt-40'>Win</p>) }
            { (roundStatus == RoundStatus.Lose) && (<p className='absolute text-4xl mt-40'>Lose</p>) }
          </>
        ) : gameStatus == GameStatus.GameOver ? (
          <button className='text-center'>Try Again</button>
        ) : <></>}
    </>
  )
}
