import os
def delfile():  
    os.remove("medi/Model/bioactivity_data_raw.csv")
    os.remove("medi/Model/bioactivity_data_preprocessed.csv")
    os.remove("medi/Model/df_final_3c.csv")
    os.remove("medi/Model/manwhitneyu_LogP.csv")
    os.remove("medi/Model/manwhitneyu_MW.csv")
    os.remove("medi/Model/manwhitneyu_NumHAcceptors.csv")
    os.remove("medi/Model/manwhitneyu_NumHDonors.csv")
    os.remove("medi/Model/manwhitneyu_PIC50.csv")
    os.remove("medi/Model/PubChem.csv")
    os.remove("medi/Model/finger.smi")
    os.remove("medi/Model/molecule.smi")
    os.remove("medi/Model/bioactivity_data_3c_pIC50_pubchem_fingerprints.csv")
