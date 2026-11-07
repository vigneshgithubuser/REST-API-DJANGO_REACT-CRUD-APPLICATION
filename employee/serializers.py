from rest_framework import serializers
from .models import EmployeeModel, User


class EmpSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmployeeModel
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password', 'role']

        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data.get(
                'role',
                'employee'
            )
        )

        return user