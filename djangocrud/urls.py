"""
URL configuration for djangocrud project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""



from django.contrib import admin
from django.urls import path

from employee.views import *

urlpatterns = [

    path('admin/', admin.site.urls),

    # EMPLOYEE CRUD
    path('save/', empsave),
    path('select/', empselect),
    path('search/<int:emp_id>', empsearch),
    path('update/<int:emp_id>', empupdate),
    path('delete/<int:emp_id>', empdelete),

    # AUTH
    path('api/login/', LoginView.as_view()),
    path('create-account/', create_account),

    # PROFILE
    path('my-profile/', my_profile),

    # FORGOT PASSWORD
    path('forgot-password/', forgot_password),

    # RESET PASSWORD
    path(
        'reset-password/<uidb64>/<token>/',
        reset_password
    ),
]