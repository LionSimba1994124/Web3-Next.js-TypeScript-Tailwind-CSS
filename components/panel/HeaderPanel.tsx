import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'
import { useRematchDispatch } from '../../shared/utils'

export const HeaderPanel: NextPage = () => {
  const router = useRouter()

  const url = useSelector((state: any) => state.account.url)

  function copyToClipboard() {
    const { toast, snackbar } = require('tailwind-toast')
    navigator.clipboard.writeText(url).then(function() {
        toast().default('Copied!', '').show()
      }, function(err) {
        toast().default('Copied!').show()
      });
  }

  return (
    <div className='flex flex-row text-3xl border-2 rounded-lg'>
        <div className='basis-3/12'>Room Code</div>
        <button onClick={() => copyToClipboard()} className='basis-9/12 border-2 rounded-lg text-left hover:bg-slate-800'>{ url || 'No URL' }</button>
    </div>
  )
}
