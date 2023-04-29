import React from 'react'
import styles from '../style'

const CardDeal = () => {
  return (
    <section id="home" className={`flex md:flex-row
    flex-col sm:py-10 py-10 bg-tertiary`}>
      <div className={`flex-1 ${styles.flexStart}
      flex-col xl:px-0 sm:px-16 px-6`}>
        <div className='flex flex-col justify-between items-center w-full'>
          <span className='font-poppins font-normal text-[22px] leading-[30.8px] text-center text-white'>AI models provided by BioPrid can be used to predict the Bioactivities of drug molecules and their interactions with target proteins.</span>
        </div>
      </div>
    </section>
  )
}

export default CardDeal
