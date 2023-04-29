import React from 'react'
import styles from "../style"
import GetStarted from './GetStarted'

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row
    flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart}
      flex-col xl:px-0 sm:px-16 px-6`}>
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]'>AI Powered <br className='sm: hidden'/> Drug Screening
          </h1>
          <div className='ss:flex hidden md:mr-4 mr-0 pr-16'>
            <GetStarted to="/models"/>
          </div>
        </div>

        <span className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Harnessing the power of AI to reduce the Drug <br className='sm: hidden'/> Development process from years to months
        </span>
      </div>
    </section>
  )
}

export default Hero
