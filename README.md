# Welcome to the BioPrid

## Description
BioPrid is an application that works with the drug screening process involved in the drug development procedure. The purpose of the application is to find potential **molecules** for a given target **protein** to cure diseases with reduced side effects, time and cost in the drug discovery procedure using deep learning.
The project consists of 2 capabilities in the form of AI models: • QSAR : Quantitative Structure Activity Relationship • DTI : Drug-Target Interaction

By target here, we mean target proteins and enzymes.

## Prerequisite

### Python Libraries


***

### React + VITE

***

# Structure of Application
## QSAR Model
![QSAR Model](https://www.creative-biolabs.com/drug-discovery/therapeutics/images/3-1-3-SAR-and-QSAR-Models.png)

***


Quantitative structure–activity relationship(QSAR) model is a classification based Deep Learning model used in the application. The model uses ANN deep learning model for the classification of bioactivity of a target molecule over a protein. It has different stages before it finally predicts the activity of a target molecule :
* ### Data Pre-processing stage
> This stage involves the filtering of selected proteins from the **target** table of the **CHEMBL** database. The proteins filtered from the Target table is further used to access the activity contents of the respective proteins from the **bioactivity** table of the **CHEMBL** database. The results are saved and the process heads towards the next stage.
* ### EDA feature extraction stage
> In this stage, **Lipinski Descriptors** are calculated for the molecules in the data gained after the stage 1. **Lipinski Descriptors** are the five key physiochemical parameters to describe **Drug-likeness** of a molecule which is a qualitative concept used in drug design for how druglike a substance is. To be an effective drug, a substance must be characterized by optimal solubility to both water and fat. The results are saved and the process heads towards the next stage.
* ### Molecule fingerprinting through PaDEL-Descriptor
> In this stage, fingerprints of molecules are calculated, which is nothing but a unique representation of the canonical smiles of a molecule. **PaDEL-Descriptor** is used to describe the fingerprints which will give a 882 length long fingerprint code based on the **PubChem** database.
* ### Final ANN model for the binary classification
> In this stage, the final model is prepared using ANN(MLP to be precise).

***

## DTI MODEL
![Deep DTA model](https://cmpe.boun.edu.tr/~hakime.ozturk/images/deepdta/deepdta.PNG)

***

Drug-target interaction is a prominent research area in the field of drug discovery. It refers to the recognition of interactions between molecules and the protein targets in the human body. These interactions are expensive as well as time consuming when processed in labs. In the apllication, KIBA dataset is being used to get the data of molecules and proteins, where canonical smiles of the molecules and protein sequences of the proteins are provided along with their affinity.

In the process, we treated protein–ligand interaction prediction as a regression problem by aiming to predict the binding affinity scores. As aprediction model, we adopted a popular deep learning architecture, Convolutional Neural Network (CNN). CNN is an architecture that contains one or more convolutional layers often followed by a pooling layer. A pooling layer down-samples the output of the previous layerand provides a way of generalization of the features that are learned by the filters. On top of the convolutional and pooling layers, the model is completed with one or more fully connected (FC) layers. The most powerful feature of CNN models is their ability to capture the local dependencies with the help of filters. Therefore, the number and size of the filters in a CNN directly affects the type of features the model learns from the input.

We proposed a CNN-based prediction model that comprises two separate CNN blocks, each of which aims to learn representations from SMILES strings and protein sequences. For each CNN block, we used three consecutive 1D-convolutional layers with increasing number of filters. The second layer had double and the third convolutional layer had triple the number of filters in the first one. The convolutional layers were then followed by the max-pooling layer. The final features of the max pooling layers were concatenated and fed into three FC layers. We used 1024 nodes in the first two FC layers, each followed by a dropout layer of rate 0.1. Dropout is a regularization technique that is used to avoid over-fitting by setting the activation of some of the neurons to 0. The third layer consisted of 512 nodes and was followed by the output layer. The proposed model that combines two CNN blocks.


***
# Conclusion
The Drug Discovery process is a very long process that can take up to 13 years. The Early Drug Discovery process typically starts by screening for potentially active compounds. Beyond just the large investment needed to produce a new drug, the process has also become more cumbersome in recent years. In addition, the post-marketing monitoring and development costs are said to be from $312 million dollars, boosting the entire lifecycle of Research and Development to three billion per drug.

The Aim of this project is to reduce the tremendous amount of time and capital required for drug-discovery with the help of Deep Learning, which is a subfield of Machine Learning. It includes identifying lead compounds for pre-clinical trials so that the substances identified during Early Drug Discovery can be refined, optimized, and extensively tested in a laboratory.
