import React from 'react'
import styles from '../style'
import { Navbar, Button } from '../components'

const Models = () => {
    return (
        <div className="bg-primary w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <section id="home" className={`flex md:flex-row
    flex-col ${styles.paddingY}`}>
                <div className={`flex-1 ${styles.flexStart}
      flex-col xl:px-0 sm:px-16 px-6`}>
                    <div className='flex flex-col justify-between items-center w-full'>
                        <Button label='Quantitative Structure-Activity Relationship Model' to="/qsar"/>
                        <Button label='Drug-Target Interaction Model' to="/dti"/>
                        <p className='font-poppins leading-[30.8px]
                            text-white'>Refer to the <a href='guide' className='text-sky-400 font-semibold'>Guide</a> section to know more about the Models.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default Models
