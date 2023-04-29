import React, {useState, createRef} from "react";
import styles from "../style";
import { Navbar, CardDeal } from "../components";
import data from "../constants/data.json"
import "./Qsar.css"

const Dti = (props) => {

    const [value, setValue] = useState("");
    const [target, setTarget] = useState("");
    const [SelectMolFile, setSelectMolFile] = useState(false);
    const [SelectProtFile, setSelectProtFile] = useState(false);
    const [MolFile, setMolFile] = useState(null);
    const [ProtFile, setProtFile] = useState(null);
    const [showReport, setShowReport] = useState(false);
    const [temp_data, setTempData] = useState({});

    // references
    const myRef = React.createRef();
    const myBtn = React.createRef();
    const myReport = React.createRef();

    const onChangeProt = (event) => {
        setTarget(event.target.value);
        console.log('prot: ', target);
    }

    const handleMolFileChange = (event) => {
        setMolFile(event.target.files[0]);
        setSelectMolFile(true);
    }

    const handleProtFileChange = (event) => {
        setProtFile(event.target.files[0]);
        setSelectProtFile(true);
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
        const btn_element = myBtn.current;
        btn_element.disabled = true;
        btn_element.innerText = "Processing..."; 
        // let postdata = {
        //     molecule: (!SelectMolFile ? value: null),
        //     molFile: (!SelectMolFile ? null: MolFile),
        //     target: (!SelectProtFile ? target: null),
        //     protFile: (!SelectProtFile ? null : ProtFile)
        // };
        console.log({
            molecule: value,
            targetName: target
        })
        const response = await fetch('http://localhost:8000/del', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                molecule: value,
                targetName: target
            })
        });
        const content = await response.json();
        btn_element.disabled = false;
        btn_element.innerText = "Submit"; 
        setShowReport(true);
        setTempData(content);
        myReport.current.scrollIntoView();
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
                    <section id="home" className={`flex md:flex-row flex-col sm:py-10 py-1 bg-modelDesc`}>
                        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                            <div className='flex justify-between items-center w-full'>
                                <span className='font-poppins font-semibold text-[22px] leading-[30.8px] text-center'>Drug-Target Interaction</span>
                            </div>
                            <div className='flex justify-between items-center w-full py-2'>
                                <p className='font-poppins leading-[30.8px]
                            '> It refers to the recognition of interactions between chemical compounds and the protein targets in the human body. Drug target interaction refers to the binding of a drug to a target location that results in a change in its behavior/function.<br /> Please refer to the <a href="#guide" className="text-blue-600"> Guide</a> section to know more about the format for the below inputs.</p>
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
                                        <input type="file" onChange={handleMolFileChange} />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='font-medium font-poppins mb-2 flex'>Target</label>
                                        <input type="text" placeholder='Enter Target protein' className='w-full border rounded-md bg-transparent border-gray-400 p-3' required onChange={onChangeProt} id="prot" ref={myRef} />

                                    </div>
                                    <button className='block bg-blue-700 text-white w-full py-2 px-8 rounded' ref={myBtn}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showReport &&
            <>
                
                <div className="py-5">
                    <div className="overflow-x-auto">
                        <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg">
                            <span className="font-poppins font-semibold text-[15px] text-green-600 text-center w-full">[SUCCESS] Data Recieved
                            </span>
                        </div>
                        <table className="w-full max-w-4xl mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg border-solid border-2 border-sky-500" ref={myReport}>
                            <thead className="bg-gray-900">
                                <tr className="text-left text-white">
                                    <th className="px-6 py-4 text-lg font-bold "> Report </th>
                                    <th className="px-6 py-4 text-lg text-right font-normal"><button className="bg-blue-700 px-4 rounded hover:bg-blue-800">Save</button></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="max-w-xs break-words">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <p className="font-semibold">
                                                Molecule SMILES
                                            </p>
                                        </div>
                                    </td>
                                    <td
                                        style={{ maxWidth: '100px' }}
                                        className="px-3 py-4 break-all"
                                    >
                                        <p className="break-all">
                                            {temp_data.molecule}
                                        </p>
                                    </td>
                                </tr>
                                <tr className="max-w-xs break-words">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <p className="font-semibold">
                                                Protein Amino Acid Sequence
                                            </p>
                                        </div>
                                    </td>
                                    <td
                                        style={{ maxWidth: '100px' }}
                                        className="px-3 py-4 break-all"
                                    >
                                        <p className="break-all">
                                            {temp_data.target}
                                        </p>
                                    </td>
                                </tr>
                                <tr className="max-w-xs break-words">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <p className="font-semibold">
                                                Binding Affinity
                                            </p>
                                        </div>
                                    </td>
                                    <td
                                        style={{ maxWidth: '100px' }}
                                        className="px-3 py-4 break-all"
                                    >
                                        <p className="break-all">
                                            {temp_data.affinity}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default Dti;