import numpy as np
import pandas as pd
import sklearn
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.layers import Dense, InputLayer
from tensorflow.keras.models import Sequential
from keras import regularizers

def QSAR(fp):

    df1 = pd.read_csv('medi/Model/bioactivity_data_3c_pIC50_pubchem_fingerprints.csv')
    df2 = pd.read_csv("medi/Model/df_final_3c.csv")

    df1.drop(["Unnamed: 0"], axis=1, inplace=True)

    df_new = pd.concat([df1, df2["bioactivity_class"]], axis=1)

    df_new = df_new[df_new['bioactivity_class'] != "intermediate"]

    df_Y = df_new["bioactivity_class"]

    df_X = df_new.drop(["bioactivity_class"], axis=1)

    # Label Encoding
    encoder = LabelEncoder()
    encoder.fit(df_Y)
    new_Y = encoder.transform(df_Y)

    df_new_Y = pd.DataFrame(new_Y, columns=["bioactivity_class"])

    train_X, test_X, train_Y, test_Y = train_test_split(
        df_X, df_new_Y, test_size=0.1, random_state=42)

    # define network architecture
    MLP = Sequential()
    MLP.add(InputLayer(input_shape=(882, ))) # input layer
    MLP.add(Dense(256, activation='relu')) # hidden layer 1
    MLP.add(Dense(256, activation='relu',kernel_regularizer=regularizers.l2(0.01) )) # hidden layer 2
    MLP.add(Dense(1, activation='sigmoid')) # output layer

    # optimization
    MLP.compile(loss='binary_crossentropy',
                optimizer='adam',
                metrics=['accuracy'])

    MLP.fit(train_X, train_Y, validation_data = (test_X, test_Y), 
        epochs=10, batch_size=48)

    # # evaluate performance
    # test_loss, test_acc = MLP.evaluate(test_X, test_Y,
    #                                 batch_size=48,verbose=0)


    fp["Name"] = int(0)

    fingerprint = np.asarray(fp)

    fingerprint = np.reshape(fingerprint, (-1, 882))

    res = MLP.predict(fingerprint, verbose=0)

    result = []
    for r in res:
        if r[0] >= 0.5:
           result.append("active") 
        else:
            result.append("inactive")
    
    res_df = pd.DataFrame(result)
    return res_df

