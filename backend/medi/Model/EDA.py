import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from numpy.random import randn, seed
from rdkit import Chem
from rdkit.Chem import Descriptors, Lipinski
from scipy.stats import mannwhitneyu

def runEDA():
    
    df = pd.read_csv("medi/Model/bioactivity_data_preprocessed.csv")

    """Calculate Descriptors
    -------------------------

    The get_mol function below provides the list of all the molecular structure from the canonical smiles present in the datasets.
    """
    
    df = df[df['molecule_chembl_id'].notna()]

    def get_mol(smiles):
        moldata = []
        for elem in smiles:
            mol = Chem.MolFromSmiles(elem)
            moldata.append(mol)
        return moldata

    """The **get_mol(smiles)* function above maps the *smiles to their corresponding molecules which are stored by the rdkit module."""


    def lip_desc(smiles, verbose=False):
        moldata = get_mol(smiles)

        i = 0
        for mol in moldata:
            desc_molWt = Descriptors.MolWt(mol)
            desc_molLogP = Descriptors.MolLogP(mol)
            desc_NumHDonors = Lipinski.NumHDonors(mol)
            desc_NumHAcceptors = Lipinski.NumHAcceptors(mol)

            row = np.array([desc_molWt, desc_molLogP,
                        desc_NumHDonors, desc_NumHAcceptors])

            if i == 0:
                data = row
            else:
                data = np.vstack([data, row])
            i = i+1
        columnNames = ["MW", "LogP", "NumHDonors", "NumHAcceptors"]
        descriptors = pd.DataFrame(data=data, columns=columnNames)

        return descriptors
    
    df_lip = lip_desc(df.canonical_smiles)
    df_combined = pd.concat([df, df_lip], axis=1)

    """Converting IC50 values to PIC50
    --------------------------------------
    """

    def PIC50(input):
        PIC50 = []

        for i in input['standard_value_norm']:
            molar = i*(10**-9)  # converts nM to M
            PIC50.append(-np.log10(molar))

        input['PIC50'] = PIC50
        x = input.drop(['standard_value_norm'], axis=1)

        return x

    """Values greater than 1000,000,000 will be fixed at 100,000,000 otherwise the negative logarithmic values will become negative, as shown above."""


    def norm_values(input):
        norm = []

        for i in input['standard_value']:
            if i > 1000000000:
                i = 1000000000
            norm.append(i)

        input['standard_value_norm'] = norm
        x = input.drop('standard_value', axis=1)

        return x


    df_norm = norm_values(df_combined)
    df_final = PIC50(df_norm)

    """*Removing the 'intermediate' bioactivity class*"""

    df_fin2c = df_final[df_final.bioactivity_class != 'intermediate']
    df_fin2c.to_csv('medi/Model/df_final_3c.csv', index=False)
    
    """*Statistical Analysis | Mann-Whitney U Test*

    Man-Whitney U Test is a statistical test which is used to determine whether 2 population samples are different or are the same.

    Reference: https://www.youtube.com/watch?v=Twk6lBhBl88
    """

    def man_whit_test(descriptor, verbose=False):

        seed(1)

        selection = [descriptor, 'bioactivity_class']
        df = df_fin2c[selection]
        active = df[df.bioactivity_class == 'active']
        # get pic50 values of 'active' molecules
        active = active[descriptor]

        selection = [descriptor, 'bioactivity_class']
        df = df_fin2c[selection]
        inactive = df[df.bioactivity_class == 'inactive']
        # get pic50 values of 'inactive' molecules
        inactive = inactive[descriptor]

        # compare samples
        stat, p = mannwhitneyu(active, inactive)

        alpha = 0.05
        if p > alpha:
            interpret = 'Same Distribution (fail to reject H0)'
        else:
            interpret = 'Different Distribution (reject H0)'

        results = pd.DataFrame({'Descriptor': descriptor,
                            'Statistics': stat,
                                'p': p,
                                'alpha': alpha,
                                'Interpretation': interpret}, index=[0])
        filename = 'manwhitneyu_' + descriptor + '.csv'
        results.to_csv('medi/Model/'+filename)

        return results

    man_PIC50 = man_whit_test('PIC50')

    man_mw = man_whit_test('MW')

    man_logp = man_whit_test('LogP')

    man_hd = man_whit_test('NumHDonors')

    man_ha = man_whit_test('NumHAcceptors')
