import pandas as pd
from .PaDel_Descriptor import fp_desc

# def mol_desc(final_bio_act):
def mdf():
    df3 = pd.read_csv('medi/Model/df_final_3c.csv')

    selection = ['canonical_smiles', 'molecule_chembl_id']
    df3_selection = df3[selection]
    df3_selection.to_csv('medi/Model/molecule.smi', sep='\t', index=False, header=False)

    """Calculate fingerprint descriptors
    --------------------------------------

    **Calculate PaDEL descriptors** (already done in command line)

    Preparing X and Y Data Matrices
    ---------------------------------------



    **X data matrix**
    """

    df3_X = fp_desc(df3_selection)

    df3_X = df3_X.drop(columns=['Name'])

    """**Y data matrix**"""

    df3_Y = df3['PIC50']

    """**Combining X and Y data matrices**"""

    dataset3 = pd.concat([df3_X, df3_Y], axis=1)

    dataset3.to_csv('medi/Model/bioactivity_data_3c_pIC50_pubchem_fingerprints.csv')
