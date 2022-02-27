import { Dispatch } from './store';
// Robust way to check if it's Node or browser
import { useDispatch } from 'react-redux'
import { models, RootModel } from "./models";

export const checkServer = () => {
  return typeof window === 'undefined'
}

export const useRematchDispatch = (selector: any) => {
  const dispatch = useDispatch()
  return selector(dispatch)
}