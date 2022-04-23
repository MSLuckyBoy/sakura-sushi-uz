from django.contrib import sitemaps
from django.urls import reverse

class MainStaticViewSitemap(sitemaps.Sitemap):
    priority = 1
    changefreq = 'daily'

    def items(self):
        return ['home', 'menu']

    def location(self, item):
        return reverse(item)

class StaticViewSitemap(sitemaps.Sitemap):
    priority = 0.7
    changefreq = 'daily'

    def items(self):
        return ['news', 'about', 'sales', 'delivery', 'contacts']

    def location(self, item):
        return reverse(item)
