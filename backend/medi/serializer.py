from .models import User
from rest_framework import serializers

  
class ReactSerializer(serializers.Serializer):
    molecule=serializers.CharField(max_length=1200)
    targetID=serializers.CharField(max_length=1200)
    targetName=serializers.CharField(max_length=1200)

class ReactSerializer2(serializers.Serializer):
    molecules=serializers.FileField()
    targetID=serializers.CharField(max_length=1200)
    targetName=serializers.CharField(max_length=1200)

class DTI(serializers.Serializer):
    molecule=serializers.CharField(max_length=1200)
    targetName=serializers.CharField(max_length=1200)

 
class DTI_CSV(serializers.Serializer):
    molecules = serializers.FileField()
    targetName=serializers.FileField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance