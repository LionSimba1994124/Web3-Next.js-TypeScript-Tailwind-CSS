import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import type { AppProps } from 'next/app'
import { provider } from 'web3-core';

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../shared/store'

import {SocketContext, socket} from '../shared/context/socket';

import '../styles/globals.css'

function getLibrary(provider: provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <ReduxProvider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <SocketContext.Provider value={socket}>
          <Component {...pageProps} />
        </SocketContext.Provider>
      </Web3ReactProvider>
    </ReduxProvider>
  )
}

export default MyApp