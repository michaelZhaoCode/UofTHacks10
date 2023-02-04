import React, { useContext } from 'react'
import dalle from '../img/dalle2.png'
import { AppContext } from './Context'

const Dalle = () => {
  // const { resp, setResp } = useContext(AppContext);
  const { resp } = useContext(AppContext);

  return (
    <div>
      {(resp === '') ? (
        <div id="loading-page">
        <div id="loader">
            <div className="particles element">
                <div className="spark1 spark element"><div className="particle1 particle element" /></div>
                <div className="spark2 spark element"><div className="particle2 particle element" /></div>
                <div className="spark3 spark element"><div className="particle3 particle element" /></div>
                <div className="spark4 spark element"><div className="particle4 particle element" /></div>
                <div className="spark5 spark element"><div className="particle5 particle element" /></div>
                <div className="spark6 spark element"><div className="particle6 particle element" /></div>
                <div className="spark7 spark element"><div className="particle7 particle element" /></div>
                <div className="spark8 spark element"><div className="particle8 particle element" /></div>
                <div className="spark9 spark element"><div className="particle9 particle element" /></div>
                <div className="spark10 spark element"><div className="particle10 particle element" /></div>
                <div className="spark11 spark element"><div className="particle11 particle element" /></div>
                <div className="spark12 spark element"><div className="particle12 particle element" /></div>
            </div>
            <div className="ray element" />
            <div className="sphere element" />
        </div>
    </div>
      ) : (

        <img src={resp} />
      )}
    </div>

  )
}

export default Dalle