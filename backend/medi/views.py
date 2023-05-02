from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from . serializer import *
from rest_framework.response import Response
from .Model import data_pre_process,EDA,model_v1,molecular_descriptors_and_fingerprinting,PaDel_Descriptor,DTI_model,dumfiles
import pandas as pd
from .models import User, history
import jwt
import json
import datetime
import pymongo
import csv
from itertools import chain
import numpy as np
from bson import json_util
connect_string="mongodb://localhost:27017"
from django.conf import settings
my_client = pymongo.MongoClient(connect_string)
import requests
dbname = my_client['BioPrid']
collection_name = dbname["medi_history"]




# Create your views here.

class ReactView(APIView):
    
    serializer_class = ReactSerializer
    def out(self,data):
        data_pre_process.preProcess(str(data['targetID']))
        EDA.runEDA()
        molecular_descriptors_and_fingerprinting.mdf()
        lst=[data['molecule']]
        df=pd.DataFrame(lst)
        df.columns=['canonical_smiles']
        x=PaDel_Descriptor.fp_pred(df)
        y=model_v1.QSAR(x)
        print(y[0])
        dumfiles.delfile()
        return(y[0])

    
    def post(self, request):
        serializer =ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return  Response({'bioactivity':self.out(request.data),'protein':request.data['targetID'],'protein_name':request.data['targetName'],'molecule':request.data['molecule']})

class ReactView2(APIView):
    
    serializer_class = ReactSerializer2
    def out(self,data):
        print(data)
        data_pre_process.preProcess(str(data['targetID']))
        EDA.runEDA()
        molecular_descriptors_and_fingerprinting.mdf()
        lst=pd.read_csv(data['molecules'])
        lst.columns=['smiles']
        x=PaDel_Descriptor.fp_pred(lst)
        y=model_v1.QSAR(x)
        dumfiles.delfile()
        final_data=lst
        final_data["BioActivity"] = y
        final_data.to_csv('medi/Model/final_data.csv', index=False)
        header = ['smiles', 'BioActivity']
        csvFile = open('medi/Model/final_data.csv', 'r')
        reader = csv.DictReader(csvFile)

        column=[]
        for each in reader:
            row={}
            for field in header:
                row[field] = each[field]
            column.append(row)

        dataS={"time":datetime.datetime.today(),'data':column,'name':data['name']}
        collection_name.update_one({'email':data['email']}, {'$push':{"QSAR":dataS}})
        
        return(y)

    
    def post(self, request):
        serializer =ReactSerializer2(data=request.data)
        if serializer.is_valid(raise_exception=True):
            x=self.out(request.data)
            response = HttpResponse(
                content_type="application/csv",
                headers={"Content-Disposition": 'attachment; filename="final_data.csv"'},
            )
            writer = csv.writer(response)
            with open('medi/Model/final_data.csv', mode="r") as csv_file:
                reader = csv.reader(csv_file) 
                for item in reader:
                     writer.writerow(item)
            return response
            

class DTIModel(APIView):
    serializer_class = DTI
    def out1(self,data):
        return DTI_model.DTI_model(str(data['molecule']),str(data['targetName']))


    def post(self, request):
        serializer = DTI(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return  Response({'affinity':self.out1(request.data),'molecule':request.data['molecule'],'target':request.data['targetName']})

class DTICSV(APIView):
    serializer_class = DTI_CSV

    
    def out1(self,data):
        print(data['molecules'])
        df=pd.read_csv(data['molecules'])
        dp=pd.read_csv(data['targetName'])
        
        print(df)
        answer=DTI_model.DTI_model(df,dp)
        affinity=list(chain.from_iterable(answer))
        final_data = pd.concat([df,dp],axis=1)
        final_data["affinity"] = affinity
        final_data.to_csv('medi/Model/final_data.csv', index=False)
        header = ['smiles', 'proteins', 'affinity']
        csvFile = open('medi/Model/final_data.csv', 'r')
        reader = csv.DictReader(csvFile)

        column=[]
        for each in reader:
            row={}
            for field in header:
                row[field] = each[field]
            column.append(row)

        dataS={"time":datetime.datetime.today(),'data':column,'name':data['name']}
        collection_name.update_one({'email':data['email']}, {'$push':{"DTI":dataS}})
        
        
        return final_data
    
    
    def post(self, request):
        serializer = DTI_CSV(data=request.data)
        if serializer.is_valid(raise_exception=True):
            x=self.out1(request.data)
            response = HttpResponse(
                content_type="text/csv",
                headers={"Content-Disposition": 'attachment; filename="final_data.csv"'},
            )
            writer = csv.writer(response)
            with open('medi/Model/final_data.csv', mode="r") as csv_file:
                reader = csv.reader(csv_file) 
                for item in reader:
                     writer.writerow(item)

            return response

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        mydict = { "emailid": serializer.data['email']}
        collection_name.insert_one(mydict)
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token,
            'detail':"User Found"
        }
        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response({"data":serializer.data,"detail":"verified"})


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

class History(APIView):

    def parse_json(self,data):
        return json.loads(json_util.dumps(data))

    def post(self, request):
        serializer = historygiver(data=request.data)
        if serializer.is_valid(raise_exception=True):
            x=collection_name.find({ 'email':request.data['email']})
            y=self.parse_json(x)
            print(y)
            return Response({"data":y[0]})

class ParicularHistory(APIView):

    def parse_json(self,data):
        return json.loads(json_util.dumps(data))

    def post(self, request):
        serializer = phistorygiver(data=request.data)
        if serializer.is_valid(raise_exception=True):
            x=collection_name.find({ 'email':request.data['email']})
            y=self.parse_json(x)
            z=y[0]["DTI"]
            m=y[0]["QSAR"]
            answer=None
            datetime_object = request.data['name']
            for i in z:
                if i["name"]==datetime_object:
                    answer=i
            for i in m:
                if i["name"]==datetime_object:
                    answer=i
            return Response({"data":answer['data']})
        
class DeleteHistory(APIView):

    def parse_json(self,data):
        return json.loads(json_util.dumps(data))

    def post(self, request):
        serializer = phistorygiver(data=request.data)
        if serializer.is_valid(raise_exception=True):
            print(request.data['name'],request.data['email'])
            print(collection_name.update({'email':request.data['email']},{'$pull':{'DTI':{'name':request.data['name']}}}))
            print(collection_name.update({'email':request.data['email']},{'$pull':{'QSAR':{'name':request.data['name']}}}))
            return Response({"data":'done'})
