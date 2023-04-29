import React from 'react'
import { arrowUp } from '../assets'
import styles from '../style'
import { Link } from 'react-router-dom'

const Button = (props) => {
  return (
    <div className={`${styles.flexCenter} max-w-[800px] h-[70px] rounded-full bg-blue-gradient p-[2px] cursor-pointer mb-8`}>
        <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full hover:bg-secondary p-[8px]`}>

          <div className={`${styles.flexStart} flex-row`}>
            <p className='font-poppins font-medium text-[18px] leading-[23px]'>
              <span className='text-white'>{props.label}
              </span>
            </p>

            <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" />
          </div>
        </div>
    </div>
  )
}

export default Button
