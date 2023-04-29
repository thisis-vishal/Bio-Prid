# #Downloading the XML data files
# !wget https://github.com/dataprofessor/padel/raw/main/fingerprints_xml.zip

# !pip install wget

# #Downloading the XML data files
# !wget https://github.com/dataprofessor/padel/raw/main/fingerprints_xml.zip

# !python -m wget https://github.com/dataprofessor/padel/raw/main/fingerprints_xml.zip

# !unzip fingerprints_xml.zip


import glob
from zipfile import ZipFile

import pandas as pd
from padelpy import padeldescriptor

def fp_desc(mol_smi):
    ZipFile("medi/Model/fingerprints_xml.zip").extractall("medi/Model/")

    # listing and sorting the downloaded files
    xml_files = glob.glob("medi/Model/*.xml")
    xml_files.sort()

    # Creating a list of present files
    FP_list = ['AtomPairs2DCount',
            'AtomPairs2D',
            'EState',
            'CDKextended',
            'CDK',
            'CDKgraphonly',
            'KlekotaRothCount',
            'KlekotaRoth',
            'MACCS',
            'PubChem',
            'SubstructureCount',
            'Substructure']

    # Creating Data Dictionary
    fp = dict(zip(FP_list, xml_files))
    # fp

    # Loading the dataset
    df = mol_smi

    # # Loading data head
    # df.head()

    # # Loading data tail
    # df.tail(2)

    # # Concatenating necessary columns
    # df2 = pd.concat([df['CANONICAL_SMILES'], df['CMPD_CHEMBLID']], axis=1)
    # df2.to_csv('molecule.smi', sep='\t', index=False, header=False)
    # df2

    # # listing the dictionary pairs
    # fp

    # Importing PubChem
    fp['PubChem']

    # Setting the fingerprint module


    fingerprint = 'PubChem'

    fingerprint_output_file = ''.join(['medi/Model/',fingerprint, '.csv'])  # Substructure.csv
    fingerprint_descriptortypes = fp[fingerprint]

    padeldescriptor(mol_dir='medi/Model/molecule.smi',
                    d_file=fingerprint_output_file,  # 'Substructure.csv'
                    # descriptortypes='SubstructureFingerprint.xml',
                    descriptortypes=fingerprint_descriptortypes,
                    detectaromaticity=True,
                    standardizenitro=True,
                    standardizetautomers=True,
                    threads=2,
                    removesalt=True,
                    log=True,
                    fingerprints=True)

    descriptors = pd.read_csv(fingerprint_output_file)
    return descriptors
# return descriptors
# descriptors

def fp_pred(mol_smi):
    ZipFile("medi/Model/fingerprints_xml.zip").extractall("medi/Model/")

    # listing and sorting the downloaded files
    xml_files = glob.glob("medi/Model/*.xml")
    xml_files.sort()

    # Creating a list of present files
    FP_list = ['AtomPairs2DCount',
            'AtomPairs2D',
            'EState',
            'CDKextended',
            'CDK',
            'CDKgraphonly',
            'KlekotaRothCount',
            'KlekotaRoth',
            'MACCS',
            'PubChem',
            'SubstructureCount',
            'Substructure']

    # Creating Data Dictionary
    fp = dict(zip(FP_list, xml_files))
    # fp

    # Loading the dataset
    df = mol_smi
    mol_smi.to_csv('medi/Model/finger.smi', sep='\t', index=False, header=False)

    # # Loading data head
    # df.head()

    # # Loading data tail
    # df.tail(2)

    # # Concatenating necessary columns
    # df2 = pd.concat([df['CANONICAL_SMILES'], df['CMPD_CHEMBLID']], axis=1)
    # df2.to_csv('molecule.smi', sep='\t', index=False, header=False)
    # df2

    # # listing the dictionary pairs
    # fp

    # Importing PubChem
    fp['PubChem']

    # Setting the fingerprint module


    fingerprint = 'PubChem'

    fingerprint_output_file = ''.join(['medi/Model/',fingerprint, '.csv'])  # Substructure.csv
    fingerprint_descriptortypes = fp[fingerprint]

    padeldescriptor(mol_dir='medi/Model/finger.smi',
                    d_file=fingerprint_output_file,  # 'Substructure.csv'
                    # descriptortypes='SubstructureFingerprint.xml',
                    descriptortypes=fingerprint_descriptortypes,
                    detectaromaticity=True,
                    standardizenitro=True,
                    standardizetautomers=True,
                    threads=2,
                    removesalt=True,
                    log=True,
                    fingerprints=True)

    descriptors = pd.read_csv(fingerprint_output_file)
    return descriptors
# !pip install scikit-learn

# X = descriptors.drop('Name', axis=1)
# y = df['Activity']  # feature being predicted

# # removing the low variance features


# def remove_low_variance(input_data, threshold=0.1):
#     selection = VarianceThreshold(threshold)
#     selection.fit(input_data)
#     return input_data[input_data.columns[selection.get_support(indices=True)]]


# X = remove_low_variance(X, threshold=0.1)
# X

# # Splitting into Train And Test

# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42)


# # Printing Shape
# X_train.shape, X_test.shape


# ((462, 18), (116, 18))

# # Implementing Random Forest

# model = RandomForestClassifier(n_estimators=500, random_state=42)
# model.fit(X_train, y_train)

# y_train_pred = model.predict(X_train)
# y_test_pred = model.predict(X_test)

# mcc_train = matthews_corrcoef(y_train, y_train_pred)
# mcc_train

# mcc_test = matthews_corrcoef(y_test, y_test_pred)
# mcc_test

# # performing cross validation

# rf = RandomForestClassifier(n_estimators=500, random_state=42)
# cv_scores = cross_val_score(rf, X_train, y_train, cv=5)
# cv_scores

# # calcutating mean from the five fold
# mcc_cv = cv_scores.mean()
# mcc_cv

# # implementing metric test in a single dataframe
# model_name = pd.Series(['Random forest'], name='Name')
# mcc_train_series = pd.Series(mcc_train, name='MCC_train')
# mcc_cv_series = pd.Series(mcc_cv, name='MCC_cv')
# mcc_test_series = pd.Series(mcc_test, name='MCC_test')

# performance_metrics = pd.concat(
#     [model_name, mcc_train_series, mcc_cv_series, mcc_test_series], axis=1)
# performance_metrics
