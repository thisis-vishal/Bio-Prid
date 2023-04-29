import React from 'react'
import styles from '../style'

const GetStarted = () => {
  return (
    <div className={`${styles.flexCenter} w-[140px] h-[70px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
        <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full hover:bg-secondary`}>
          <div className={`${styles.flexStart} flex-row`}>
            <p className='font-poppins font-medium text-[18px] leading-[23px]'>
              <span className='text-white'>Get Started</span>
            </p>
          </div>
        </div>
    </div>
  )
}

export default GetStarted
