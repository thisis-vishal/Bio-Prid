#import packages
import tensorflow as tf
import random
from tensorflow.keras import regularizers
from tensorflow.keras import optimizers
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import pandas as pd
import numpy as np

def DTI_model(drug,protein):

  data = pd.read_csv("medi/Model/affinity.csv")

  np.random.seed(42)
  tf.random.set_seed(42)
  random.seed(42)

  smiles = list(data["smiles"])
  proteins = list(data["proteins"])

  # split

  split = int(0.9 * len(smiles))
  train_smiles = smiles[:split]
  train_proteins = proteins[:split]

  # load model
  model=load_model('medi/Model/new_DTI.h5', compile=False)

  #compile model
  optimizer = optimizers.Adam(learning_rate = 0.001)
  model.compile(loss='mse', optimizer = optimizer ,metrics=['mse'])


  # Tokenize smiles
  tokenizer_smiles = Tokenizer(char_level = True)
  tokenizer_smiles.fit_on_texts(train_smiles)

  # Tokenize proteins
  tokenizer_proteins = Tokenizer(char_level = True)
  tokenizer_proteins.fit_on_texts(train_proteins)

  def predict_pKd(drug, protein):

    drugs = drug["smiles"].values.tolist()
    proteins = protein["proteins"].values.tolist()

    drug_sequence = []
    drug_padded = []

    for d in drugs:
      drug_sequence.append(tokenizer_smiles.texts_to_sequences([d]))
      drug_padded.append(pad_sequences(tokenizer_smiles.texts_to_sequences([d]), truncating= "post", padding = "post", maxlen=85))
    
    protein_sequence = []
    protein_padded = []

    for p in proteins:
      protein_sequence.append(tokenizer_proteins.texts_to_sequences([p]))
      protein_padded.append(pad_sequences(tokenizer_proteins.texts_to_sequences([p]), truncating = "post",padding = "post", maxlen =1200 ))
    
    prediction = []

    for i in range(len(drug_padded)):
      pred = model.predict([tf.expand_dims(drug_padded[i], axis = -1), tf.expand_dims(protein_padded[i], axis = -1)])
      prediction.append(pred)
    return(prediction)

  final_pred = predict_pKd(drug,protein)

  return final_pred