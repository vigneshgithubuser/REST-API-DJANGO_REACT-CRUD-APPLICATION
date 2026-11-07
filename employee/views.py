from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EmpSerializer
from .models import EmployeeModel
from .models import User


from django.core.mail import send_mail
import secrets

@api_view(['POST'])

def empsave(request):

    serializer = EmpSerializer(data=request.data)

    if serializer.is_valid():

        employee = serializer.save()

        username = employee.emp_email

        temp_password = secrets.token_hex(4)

        user = User.objects.create_user(

            username=username,

            email=employee.emp_email,

            password=temp_password,

            role="employee"

        )

        employee.user = user

        employee.save()
        print("BEFORE MAIL")
        send_mail(

            subject="Employee Portal Login Details",

            message=f"""
Welcome to Employee Portal

Username:
{username}

Temporary Password:
{temp_password}

Please login and change your password.
""",

            from_email=None,

            recipient_list=[employee.emp_email],

            fail_silently=False

        )
        print("AFTER MAIL")

        return Response({

            "message": "Employee Created Successfully",

            "username": username

        })

    return Response(serializer.errors, status=400)
    
@api_view(['GET'])
def empselect(request):
    employee = EmployeeModel.objects.all()
    serialize = EmpSerializer(employee,many=True)
    return Response(status=200,data=serialize.data)

@api_view(['GET'])
def empsearch(request,emp_id):
    employee = EmployeeModel.objects.get(emp_id=emp_id)
    if emp_id:
        serialize = EmpSerializer(employee)
        return Response({"status":"success","employee":serialize.data},status=200)
    else:
        return Response({"status":"failure","data":serialize.errors},status=400)
    

@api_view(['PATCH'])
def empupdate(request, emp_id):
    try:
        employee = EmployeeModel.objects.get(emp_id=emp_id)
    except EmployeeModel.DoesNotExist:
        return Response({"error": "Employee not found"}, status=404)

    serializer = EmpSerializer(employee, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"status": "success","employee": serializer.data}, status=200)

    return Response({"status": "error","errors": serializer.errors}, status=400)


@api_view(['DELETE'])
def empdelete(request, emp_id):

    employee = EmployeeModel.objects.get(
        emp_id=emp_id
    )

    if employee.user:
        employee.user.delete()

    employee.delete()

    return Response({
        "message": "Deleted Successfully"
    })


from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user is not None:

            refresh = RefreshToken.for_user(user)

            return Response({

    "access": str(refresh.access_token),

    "refresh": str(refresh),

    "role": str(user.role).lower(),

    "username": user.username

})

        return Response({

            "error": "Invalid credentials"

        }, status=400)
        
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from .models import EmployeeModel
from django.core.mail import send_mail
import secrets

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def my_profile(request):

    employee = EmployeeModel.objects.get(
        user=request.user
    )

    return Response({

        "name": employee.emp_name,
        "department": employee.emp_dept,
        "salary": employee.emp_salary,
        "bonus": employee.emp_bonus,

    })
    
    
    
@api_view(['POST'])
def create_account(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({
            "error": "User already exists"
        }, status=400)

    user = User.objects.create_user(
        username=username,
        password=password
    )

    return Response({
        "message": "Account created successfully"
    })


@api_view(['POST'])
def forgot_password(request):

    email = request.data.get("email")

    try:

        user = User.objects.get(
            email=email
        )

    except User.DoesNotExist:

        return Response({

            "error": "Email not found"

        }, status=404)

    new_password = secrets.token_hex(4)

    user.set_password(
        new_password
    )

    user.save()

    send_mail(

        subject="Password Reset",

        message=f"""

Your password has been reset.

Username:
{user.username}

New Password:
{new_password}

""",

        from_email=None,

        recipient_list=[email],

        fail_silently=False

    )

    return Response({

        "message": "New password sent to email"

    })


@api_view(['POST'])
def reset_password(request, uidb64, token):

    return Response({
        "message": "Password reset successful"
    })
    
    
    
from django.core.mail import send_mail
import secrets