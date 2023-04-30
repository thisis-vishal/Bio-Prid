import React from 'react'
import { Navbar } from '../components'
import styles from '../style'

const Guide = ({signed}) => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar signed={signed}/>
            </div>
      </div>

      <div className={`${styles.paddingX} ${styles.flexCenter} bg-modelDesc`}>
            <div className={`${styles.boxWidth}`}>
                <div className='pl-20 pr-20 pt-20 pb-10'>
                  <p className='font-poppins font-normal'>BioPrid provides 2 AI models for predicting the interactions between drug molecules and target proteins associated with diseases. This guide tells more about the models and the input formats for accessing their functionalities. </p>
                </div>
                <div className='pl-20 pr-20 pb-10'>
                  <h1 className='text-[40px]'>QSAR (Quantitative Structure-Activity Relationship)</h1>
                  <hr className='border-blue-600'/>
                  <p className='pt-5 pb-5 font-poppins font-normal'>Quantitative structure–activity relationship models (QSAR models) are regression or classification models used in the chemical and biological sciences and engineering. Like other regression models, QSAR regression models relate a set of "predictor" variables (X) to the potency of the response variable (Y), while classification QSAR models relate the predictor variables to a categorical value of the response variable.
                  In QSAR modeling, the predictors consist of physico-chemical properties or theoretical molecular descriptors of chemicals; the QSAR response-variable could be a biological activity of the chemicals. QSAR models first summarize a supposed relationship between chemical structures and biological activity in a data-set of chemicals. Second, QSAR models predict the activities of new chemicals.<br/><br/>
                  The QSAR Model form expects 2 inputs:
                  </p>
                  <p className='font-poppins pb-5'><span className='font-semibold'>1. Molecule: </span>The drug molecule which is to be screened based on its interaction with the protein. The user can either enter a single molecule in the input field, or we can give a csv file as the input with a bunch of molecules to be tested.</p>
                  <p className='font-poppins pb-5'><span className='font-semibold'>2. Target: </span>The target is the protein associated with a particular disease. The drug molecules are tested based on their interactions with the targets. The user can select the protein of their interest from the drop-down list of all protein targets.</p>
                  <p className='font-poppins pb-5'>The output of the model would consist of the following parameters: </p>
                  <ul className='font-poppins font-semibold pb-5'>
                    <li>1. Molecule CHEMBL ID</li>
                    <li>2. Molecule <a href="https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system" className='text-sky-600'>SMILES</a></li>
                    <li>3. Protein</li>
                    <li>4. Bioactivity</li>
                  </ul>
                  <p className='font-poppins pb-5'>If a molecule file is the input instead of the single molecule SMILES, then the output would be a .csv file with resulting bioactivities of the each molecule.</p>
                </div>
                <div className='pl-20 pr-20 pb-10'>
                  <h1 className='text-[40px]'>DTI (Drug-Target Interaction)</h1>
                  <hr className='border-blue-600'/>
                  <p className='pt-5 pb-5 font-poppins font-normal'>Drug target interaction refers to the binding of a drug to a target location that results in a change in its behavior/function. Drug target interaction is a prominent research area in the field of drug discovery. It refers to the recognition of interactions between chemical compounds and the protein targets in the human body. The chemical compound of the drug binds to the target molecule by forming temporary bonds. The attached drug then reacts with the biological target to create a positive or a negative change and consequently leaves the biological target. The drugs inhibit the functioning of the target to prevent certain catalyzed reactions occurring in the human body in order to treat diseases.<br/><br/>
                  The DTI Model form expects 2 inputs:
                  </p>
                  <p className='font-poppins pb-5'><span className='font-semibold'>1. Molecule: </span>The drug molecule which is to be screened based on its interaction with the protein. The user can either enter a single molecule in the input field, or we can give a csv file as the input with a bunch of molecules to be tested.</p>
                  <p className='font-poppins pb-5'><span className='font-semibold'>2. Target: </span>The target is the protein associated with a particular disease. The proteins here would be represented in the form of a sequence of amino acids.</p>
                  <p className='font-poppins font-semibold pb-5'>If both the inputs are .csv files, the model would treat the files as Molecule-Target pairs. Therefore, the number of entries in both the input files should be the same.</p>
                  <p className='font-poppins pb-5'>The output of the model would consist of the following parameters: </p>
                  <ul className='font-poppins font-semibold pb-5'>
                    <li>1. Molucule SMILES</li>
                    <li>2. Protein Sequence</li>
                    <li>3. Binding Affinity</li>
                  </ul>
                  <p className='font-poppins pb-5'>If any or both of the inputs are in the form of .csv files, then the output would also consist of a .csv file with corresponding predicted binding affinities for each molecule-target pair.</p>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Guide
