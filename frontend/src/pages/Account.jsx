import { React, useState } from 'react'
import styles from '../style'
import { Navbar } from '../components'
import { user } from '../assets'
import { download, edit } from '../assets'
import '../assets/delete.png'

// export file data to csv
const to_csv = () => {

} 

const Acc_det = () => {
    return (
        <div className='bg-gray-200 flex flex-col p-6'>
            <img src={user} className='w-[60px] h-[60px] ml-auto mr-auto' />
            <div className='bg-save m-2 mt-8'>
                <div className='flex flex-col ml-2 mr-2 mt-8 mb-8'>
                    <div className='flex flex-row text-center p-2 sm:ml-2 sm:mr-2 ml-4 mr-4'>
                        <span className='w-2/5 font-poppins  bg-primary text-white'>Name</span>
                        <span className='w-full font-poppins bg-gray-200'>Aditya Rana</span>
                    </div>
                    <div className='flex flex-row text-center p-2 sm:ml-2 sm:mr-2 ml-4 mr-4'>
                        <span className='w-2/5 font-poppins  bg-primary text-white'>E-mail</span>
                        <span className='w-full font-poppins bg-gray-200'>adityarana1290@gmail.com</span>
                    </div>
                </div>               
            </div>
            <div className='w-1/2 ml-auto mr-auto text-blue-600 flex flex-col'>
                <a className='text-center' href="/signin"><span className='font-poppins text-blue-400'>Change Password</span></a>
            </div>
        </div>
    )
}

const History = () => {
    return (
        <div className='bg-gray-200 flex flex-col h-full p-6 overflow-scroll'>
            <div className={`w-full hover:border-2 hover:border-black hover:font-semibold hover:transition bg-save rounded p-2 mb-2`}>
                <span className='font-poppins text-[12px] mr-4'>Created: 27/03/2023</span>
                <span className='text-blue-600 font-semibold text-[14px] float-right cursor-pointer ml-2 mr-2 mt-auto mb-auto hover:shadow-lg'>Download</span>
                
                <span className='font-poppins font-semibold text-[14px] text-red-600 float-right cursor-pointer ml-2 mr-2'>Delete</span>
                <br />
                <div className='w-full flex flex-row'>
                    <span className='font-poppins font-semibold text-[14px] text-blue-800'>mol_descriptors_sv11943.csv </span>
                    <span className='cursor-pointer ml-2 mr-2 mt-auto mb-auto hover:shadow-lg'><img src={edit} className='w-[18px] h-[18px]'/></span>
                </div>
            </div>
            <div className={`w-full hover:border-2 hover:border-black hover:font-semibold hover:transition bg-save rounded p-2 mb-2`}>
                <span className='font-poppins text-[12px] mr-4'>Created: 27/03/2023</span>
                <span className='text-blue-600 font-semibold text-[14px] float-right cursor-pointer ml-2 mr-2 mt-auto mb-auto hover:shadow-lg'>Download</span>
                
                <span className='font-poppins font-semibold text-[14px] text-red-600 float-right cursor-pointer ml-2 mr-2'>Delete</span>
                <br />
                <div className='w-full flex flex-row'>
                    <span className='font-poppins font-semibold text-[14px] text-blue-800'>bt133943.csv </span>
                    <span className='cursor-pointer ml-2 mr-2 mt-auto mb-auto hover:shadow-lg'><img src={edit} className='w-[18px] h-[18px]'/></span>
                </div>
            </div>
        </div>
    )
}

const Account = () => {

    const [account, setAccount] = useState(false);
    const [history, setHistory] = useState(false);
    const [text, setText] = useState("hello");

    return (
        <div className='flex flex-col h-screen'>
            <div className="bg-primary w-full">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>
            </div>
            <div className='flex flex-grow overflow-auto'>
                <div className='p-8 pl-auto flex flex-row h-full w-full'>
                    <div className='bg-gray-200 flex flex-col h-full w-2/5 p-2'>
                        <div className={`w-full hover:bg-save hover:font-semibold hover:transition text-center cursor-pointer ${account && `bg-primary text-white font-semibold`}`}>
                            <button className={`block h-full w-full p-6`} onClick={() => {
                                setHistory(false);
                                setAccount(true);
                            }}>
                                <span className='pt-4 pb-4 text-[15px] font-poppins w-full h-full'>Account</span>
                            </button>
                        </div>
                        <div className={`w-full hover:bg-save hover:transition hover:font-semibold text-center cursor-pointer 
                        ${history && `bg-primary text-white font-semibold`}`}>
                            <button className={`block h-full w-full p-6`} onClick={() => {
                                setAccount(false);
                                setHistory(true);
                            }}>
                                <span className='pt-4 pb-4 text-[15px] font-poppins w-full h-full'>Saved</span>
                            </button>
                        </div>
                        <hr className='border-gray-400 w-3/4 ml-auto mr-auto mt-2 mb-2' />
                        <div className='w-full text-red-400 hover:bg-red-400 hover:text-white hover:transition hover:font-semibold text-center p-6 cursor-pointer'>
                            <span className='pt-4 pb-4 text-[15px] font-poppins'>LogOut</span>
                        </div>
                    </div>
                    <div className='flex flex-col h-full w-full pl-2 pr-2 overflow-auto'>
                        {account && Acc_det()}
                        {history && History()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
