from country import views
from django.conf.urls import url
from django.conf.urls import include

urlpatterns = [
    url(r'^continent\.json$', views.get_continent),
    url(r'^names\.json$', views.get_names),
    url(r'^capital\.json$', views.get_capital),
    url(r'^phone\.json$', views.get_phone),
    url(r'^api-auth/', include('rest_framework.urls')),
]
