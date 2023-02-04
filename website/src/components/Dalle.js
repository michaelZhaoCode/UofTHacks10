import React, { useContext } from 'react'
import dalle from '../img/dalle2.png'
import { AppContext } from './Context'

const Dalle = () => {
  // const { resp, setResp } = useContext(AppContext);
  const {resp} = useContext(AppContext);

  return (
    
    <img src={resp}/>
  )
}

export default Dalle