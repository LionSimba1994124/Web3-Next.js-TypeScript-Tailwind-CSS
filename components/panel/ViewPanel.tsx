import type { NextPage } from 'next'

import { useSelector } from 'react-redux'
import { useRematchDispatch } from '../../shared/utils'

export const ViewPanel: NextPage = () => {
    const { self, opponent } = useSelector((state: any) => ({
        self: state.account.address,
        opponent: state.account.opponent,
    }))

    const { setPlayerStatus } = useRematchDispatch((dispatch: any) => ({
        setPlayerStatus: dispatch.account.setStatus,
    }))

    return (
        <>
            <div className='border-2 rounded-lg h-32'>
                <p className='text-3xl pl-3 border-2 rounded-lg'>Players</p>
                <p className='text-2xl pl-3'>{ self }</p>
                <p className='text-2xl pl-3'>{ opponent }</p>
            </div>
            <div className='border-2 rounded-lg h-64'>
                <p className='text-3xl pl-3 border-2 rounded-lg'>Viewers</p>
            </div>
        </>
    )
}
