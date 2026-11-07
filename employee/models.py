from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = (

        ('manager', 'Manager'),

        ('employee', 'Employee'),

    )

    role = models.CharField(

        max_length=10,

        choices=ROLE_CHOICES,

        default='employee'

    )


class EmployeeModel(models.Model):

    user = models.OneToOneField(

        User,

        on_delete=models.CASCADE,

        null=True,

        blank=True

    )

    emp_id = models.IntegerField(
        unique=True
    )

    emp_name = models.CharField(
        max_length=100
    )

    emp_email = models.EmailField(

    unique=True,

    null=True,

    blank=True

)

    emp_dept = models.CharField(
        max_length=100
    )

    emp_salary = models.IntegerField()

    emp_bonus = models.IntegerField()

    is_account_created = models.BooleanField(
        default=False
    )

    def __str__(self):

        return self.emp_name