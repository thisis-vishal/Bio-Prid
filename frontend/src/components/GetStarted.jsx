import React from 'react'
import styles from '../style'
import { Link } from 'react-router-dom'

const GetStarted = (props) => {
  return (
    <div className={`${styles.flexCenter} w-[140px] h-[70px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
      <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full hover:bg-secondary`}>
        <Link to={props.to}>
          <div className={`${styles.flexStart} flex-row`}>
            <p className='font-poppins font-medium text-[18px] leading-[23px]'>
              <span className='text-white'>Get Started</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default GetStarted
