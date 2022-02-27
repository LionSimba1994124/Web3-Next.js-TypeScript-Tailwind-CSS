import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto">
      <p className="text-4xl text-center mt-40">Proof of Win!</p>
      <p className="text-2xl text-center mt-5">Have on an chain of you defeating your opponent</p>
      <div className="mt-10 text-center">
        <p>Pick a game</p>
        <button onClick={() => router.push('/round')} className="mt-5 py-10 mx-2 mb-4 text-lg font-bold rounded-lg w-56 bg-black text-white border-solid border-2 hover:bg-slate-800">Rock Paper Scissors</button>
        <button className="mt-5 py-10 mx-2 mb-4 text-lg font-bold rounded-lg w-56 bg-black text-white border-solid border-2 hover:bg-slate-800">Coming soon</button>
        <button className="mt-5 py-10 mx-2 mb-4 text-lg font-bold rounded-lg w-56 bg-black text-white border-solid border-2 hover:bg-slate-800">Coming soon</button>
      </div>
    </div>
  )
}

export default Home
