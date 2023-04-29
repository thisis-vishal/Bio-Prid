import React from "react";
import styles from "../style";
import { Navbar, CardDeal } from "../components";

const Dti = () => {
    return (
        <>
            <div className="bg-primary w-full overflow-hidden">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>
            </div>

            <div className={`bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <section id="home" className={`flex md:flex-row
    flex-col sm:py-10 py-1 bg-modelDesc`}>
                        <div className={`flex-1 ${styles.flexStart}
      flex-col xl:px-0 sm:px-16 px-6`}>
                            <div className='flex justify-between items-center w-full'>
                                <span className='font-poppins font-semibold text-[22px] leading-[30.8px] text-center'>Drug-Target Interaction</span>
                            </div>
                            <div className='flex justify-between items-center w-full py-2'>
                                <p className='font-poppins leading-[30.8px]
                            '> It refers to the recognition of interactions between chemical compounds and the protein targets in the human body. Drug target interaction refers to the binding of a drug to a target location that results in a change in its behavior/function.<br/> Please refer to the <a href="#guide" className="text-blue-600"> Guide</a> section to know more about the format for the below inputs.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Dti;