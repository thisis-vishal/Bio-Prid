import React from 'react'
import styles from '../style'
import { ai_need } from '../constants'
import { right } from '../assets';
import { Navbar, Hero, CardDeal, Stats } from '../components';
import { Link } from 'react-router-dom';

const Home = (props) => (

    <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar signed={props.signed} />
            </div>
        </div>

        <div className={`bg-primary ${styles.flexStart} ml-12 mr-12`}>
            <div className={`${styles.boxWidth}`}>
                <Hero />
            </div>
        </div>

        <div className={`bg-primary ${styles.flexStart} ml-12 mr-12`}>
            <div className={`${styles.boxWidth}`}>
                <CardDeal />
            </div>
        </div>

        <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <section id="home" className={`flex md:flex-col flex-col sm:py-10 py-1 bg-white ml-12 mr-12`}>
                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                        <div className='flex flex-row justify-between items-center w-full bg-hero-lg'>
                            <div className="absolute left w-[5px] h-[50px]  bg-blue-600">
                            </div>
                            <h1 className='flex-1 font-poppins font-semibold ss:text-[42px] text-[52px] ss:leading-[100px] leading-[75px] ml-6 mb-0'>Need of <br className='sm: hidden' /> AI in Drug Screening
                            </h1>
                        </div>
                    </div>
                    <div className={`flex-1 ${styles.flexStart} flex-row`}>
                        <Stats />
                    </div>
                    <div className={`flex-1 ${styles.flexStart} flex-row xl:px-0 sm:px-16 px-6`}>
                        <p className={`text-[18px] font-poppins font-normal text-center`}>{ai_need}</p>
                    </div>
                </section>
                <section id="home" className={`flex md:flex-col flex-col sm:py-10 py-1 bg-yellow ml-12 mr-12`}>
                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                        <div className='flex flex-row justify-between items-center w-full bg-hero-lg'>
                            <div className="absolute left w-[5px] h-[50px]  bg-blue-600">
                            </div>
                            <h1 className='flex-1 font-poppins font-semibold ss:text-[42px] text-[52px]  ss:leading-[100px] leading-[75px] ml-6'>Capabilities
                            </h1>
                        </div>
                    </div>
                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                        <div className='flex flex-col justify-between items-left w-full bg-hero-lg'>
                            <div className='flex flex-row items-left'>
                                <Link to="/guide">
                                    <h1 className='flex flex-row font-poppins font-semibold ss:text-[22px] text-[32px] hover:text-blue-800 ss:leading-[100px] leading-[75px] ml-6'>Quantitative Structure-Activity Relationship <img src={right} className='w-[30px] h-[30px] ml-6 mt-auto mb-auto'/>
                                    </h1>
                                </Link>                                
                            </div>
                            <div className='flex flex-row items-left'>
                                <Link to="/guide">
                                    <h1 className='flex flex-row font-poppins font-semibold ss:text-[22px] text-[32px] hover:text-blue-800 ss:leading-[100px] leading-[75px] ml-6'>Drug-Target Interaction
                                        <img src={right} className='w-[30px] h-[30px] ml-6 mt-auto mb-auto'/>
                                    </h1>
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
);

export default Home;