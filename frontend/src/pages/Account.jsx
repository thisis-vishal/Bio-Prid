import { React, useState, useEffect } from 'react'
import styles from '../style'
import { Navbar } from '../components'
import { user } from '../assets'
import { download, edit } from '../assets'
import '../assets/delete.png'
import { useNavigate } from 'react-router-dom'
import Papa from "papaparse";

const Account = (props) => {

    const [account, setAccount] = useState(false);
    const [history, setHistory] = useState(false);
    const [text, setText] = useState("hello");
    // user credentials
    const [username, setUserName] = useState("");
    const [userID, setUserID] = useState("");
    const [data, setData] = useState({});

    // navigator
    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                const user_cred = await fetch("http://localhost:8000/user", {
                    credentials: 'include'
                });
                const user_cred_json = await user_cred.json();
                if (user_cred_json.detail === "Unauthenticated!") {
                    navigate("/signin");
                    return;
                }

                setUserName(user_cred_json.data.name);
                setUserID(user_cred_json.data.email);
                console.log(username, ": ", userID);
                const hist_response = await fetch("http://localhost:8000/history", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: "include",
                    body: JSON.stringify({ email: user_cred_json.data.email })
                });

                const hist_resp_json = await hist_response.json();
                console.log(hist_resp_json);
                setData(hist_resp_json);
                //const content = await response.json();
            }
        )();
    }, []);

    return (
        <div className='flex flex-col h-screen'>
            <div className="bg-primary w-full">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar signed={props.signed}/>
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
                        <div className='w-full text-red-400 hover:bg-red-400 hover:text-white hover:transition hover:font-semibold text-center cursor-pointer'>
                            <button className={`block h-full w-full p-6`} onClick={() => {
                                fetch("http://localhost:8000/logout", {
                                    method: 'POST',
                                    credentials: 'include'
                                }).then((res) => console.log(res)).then(navigate('/'))
                            }}>
                                <span className='pt-4 pb-4 text-[15px] font-poppins'>LogOut</span>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col h-full w-full pl-2 pr-2 overflow-auto'>
                        {account && Acc_det(username, userID)}
                        {history && History(data)}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Acc_det = (username, userID) => {
    return (
        <div className='bg-gray-200 flex flex-col p-6'>
            <img src={user} className='w-[60px] h-[60px] ml-auto mr-auto' />
            <div className='bg-save m-2 mt-8'>
                <div className='flex flex-col ml-2 mr-2 mt-8 mb-8'>
                    <div className='flex flex-row text-center p-2 sm:ml-2 sm:mr-2 ml-4 mr-4'>
                        <span className='w-2/5 font-poppins bg-primary text-white'>Name</span>
                        <span className='w-full font-poppins bg-gray-200'>{username}</span>
                    </div>
                    <div className='flex flex-row text-center p-2 sm:ml-2 sm:mr-2 ml-4 mr-4'>
                        <span className='w-2/5 font-poppins  bg-primary text-white'>E-mail</span>
                        <span className='w-full font-poppins bg-gray-200'>{userID}</span>
                    </div>
                </div>
            </div>
            <div className='w-1/2 ml-auto mr-auto text-blue-600 flex flex-col'>
                <a className='text-center' href="/signin"><span className='font-poppins text-blue-400'>Change Password</span></a>
            </div>
        </div>
    )
}

const export_file = (data, name) => {
    const _data = Papa.unparse(data);
    const blob = new Blob([_data], { type: 'text/json' })
    const a = document.createElement('a')
    a.download = `${name}.csv`
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

const History = (data) => {
    return (
        <div className='bg-gray-200 flex flex-col h-full p-6 overflow-scroll'>

            {data.data.QSAR.map((item) => (
                <div className={`w-full hover:border-2 hover:border-black hover:font-semibold hover:transition bg-save rounded p-2 mb-2`}>
                    <span className='font-poppins text-[12px] mr-4'>Created: {new Date(item.time.$date).toLocaleString('en-IN', { timeZone: 'IST' })}</span>
                    <span className='text-blue-600 font-semibold text-[14px] float-right cursor-pointer ml-2 mr-2 mt-auto mb-auto hover:shadow-lg'>
                        <button onClick={() => export_file(item.data, item.name)}>Download</button></span>
                    <span className='font-poppins font-semibold text-[14px] text-red-600 float-right cursor-pointer ml-2 mr-2'>Delete</span>
                    <br />
                    <div className='w-full flex flex-row'>
                        <span className='font-poppins font-semibold text-[14px] text-blue-800'>{item.name}.csv</span>
                    </div>
                </div>
            ))}

            {data.data.DTI.map((item) => (
                <div className={`w-full hover:border-2 hover:border-black hover:font-semibold hover:transition bg-save rounded p-2 mb-2`}>
                    <span className='font-poppins text-[12px] mr-4'>Created: {new Date(item.time.$date).toLocaleString('en-IN', { timeZone: 'IST' })}</span>
                    <span className='text-blue-600 font-semibold text-[14px] float-right cursor-pointer ml-2 mr-2 mt-auto mb-auto hover:shadow-lg'>
                        <button onClick={() => export_file(item.data, item.name)}>Download</button></span>
                    <span className='font-poppins font-semibold text-[14px] text-red-600 float-right cursor-pointer ml-2 mr-2'>Delete</span>
                    <br />
                    <div className='w-full flex flex-row'>
                        <span className='font-poppins font-semibold text-[14px] text-blue-800'>{item.name}.csv</span>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default Account
