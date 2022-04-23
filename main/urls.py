from django.urls import path
from . import views
from django.contrib.sitemaps.views import sitemap
from django.contrib.sitemaps import GenericSitemap
from .models import Menu, NewsPage, Sales
from .sitemaps import MainStaticViewSitemap, StaticViewSitemap

sitemaps = {
    'main': MainStaticViewSitemap,
    'static': StaticViewSitemap,
    'menu': GenericSitemap({'queryset': Menu.objects.all()}, priority=0.8),
    'news': GenericSitemap({'queryset': NewsPage.objects.all()}, priority=0.5),
    'sales': GenericSitemap({'queryset': Sales.objects.all()}, priority=0.5),
}

urlpatterns = [
    path('', views.index, name='home'),
    path('search/', views.SearchView, name='search'),
    path('login/', views.LoginView, name='login'),
    path('register/', views.RegisterView, name='register'),
    path('checkout/', views.CheckoutView, name='checkout'),
    path('menu', views.menu, name='menu'),
    path('menu/<int:post_id>', views.show_product, name='post'),
    path('news', views.news, name='news'),
    path('news/<int:shownews_id>', views.show_news, name='shownews'),
    path('about', views.about, name='about'),
    path('sales', views.sales, name='sales'),
    path('sales/<int:sale_id>', views.show_sales, name='sale'),
    path('delivery', views.delivery, name='delivery'),
    path('contacts', views.contacts, name='contacts'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap')
]
