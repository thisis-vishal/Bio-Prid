import React, { useState, createRef } from "react";
import styles from "../style";
import { Navbar, CardDeal, SignInForm } from "../components";
import data from "../constants/data.json"
import './Qsar.css'

const Qsar = () => {

    const [value, setValue] = useState("");
    const [target, setTarget] = useState("");
    const [SelectFile, setSelectFile] = useState(false);
    const [File, setFile] = useState(null);

    // references
    const myRef = React.createRef();

    const onChangeProt = (event) => {
        setTarget(event.target.value);
        console.log('prot: ', target);
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setSelectFile(true);
    }

    const onChangeMol = (event) => {
        setValue(event.target.value);
        console.log('mol: ', value);
    }

    const onSearch = (searchTerm, ID) => {
        setTarget(ID);
        const element = myRef.current;
        element.value = searchTerm;
        console.log('search: ', target);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let postdata;
        if(!SelectFile) {
            postdata = {
                molecule: value,
                target: target
            }
        }
        else {
            postdata = {
                molecule: null,
                file: File,
                target: target
            }
        }

        console.log(postdata);
        console.log(postdata.file);
    }

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
                    <section id="qsar_title" className={`flex md:flex-row flex-col sm:py-10 py-1 bg-modelDesc`}>
                        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                            <div className='flex justify-between items-center w-full'>
                                <span className='font-poppins font-semibold text-[22px] leading-[30.8px] text-center'>Quantitative Structure-Activity Relationship</span>
                            </div>
                            <div className='flex justify-between items-center w-full py-2'>
                                <p className='font-poppins leading-[30.8px]
                            '> QSAR is a computational modeling method for revealing relationships between structural properties of chemical compounds and biological activities. In QSAR modeling, the predictors consist of physico-chemical properties or theoretical molecular descriptors of chemicals; the QSAR response-variable could be a biological activity of the chemicals.<br /><p className="font-poppins text-gray-600 leading-[30.8px]">Please refer to the <a href="#guide" className="text-blue-600"> Guide</a> section to know more about the format for the below inputs.</p></p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className="flex flex-col flex-auto w-full p-20">
                <div className="h-full">
                    <div className="grid grid-cols-3 h-full">
                        <div className="col-span-3 flex justify-center items-center place-items-center">
                            <div className="min-w-[450] px-8">
                                <form onSubmit={onSubmit}>
                                    <div className='mb-3'>
                                        <label className='font-medium font-poppins mb-2 flex'>Molecule</label>
                                        <input type="text" placeholder='Enter SMILES notation' className='w-full border rounded-md bg-transparent border-gray-400 p-2 ' onChange={onChangeMol} />
                                        <input type="file" onChange={handleFileChange}/>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='font-medium font-poppins mb-2 flex'>Target</label>
                                        <input type="text" placeholder='Enter Target protein' className='w-full border rounded-md bg-transparent border-gray-400 p-3' required onChange={onChangeProt} id="prot" ref={myRef}/>
                                        <div className="dropdown">
                                            {
                                                data.filter(item => {
                                                    const searchTerm = target.toLowerCase();
                                                    const name = item.perf_name.toLowerCase();

                                                    return searchTerm && name.startsWith(searchTerm) && name !== searchTerm;
                                                }).slice(0, 7)
                                                    .map((item) => (
                                                        <div onClick={() => {
                                                            onSearch(item.perf_name, item.target_chembl_id)
                                                        }}
                                                            className='dropdown-row'
                                                            key={item.target_chembl_id}>{item.perf_name}</div>
                                                    ))
                                            }
                                        </div>

                                    </div>
                                    <button className='block bg-blue-700 text-white w-full py-2 px-8 rounded' type='submit'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Qsar;