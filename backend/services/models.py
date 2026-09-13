from django.db import models

from salons.models import Salon, SalonCategory


class Service(models.Model):

    salon = models.ForeignKey(Salon,on_delete=models.CASCADE,related_name="services")

    category = models.ForeignKey(SalonCategory,on_delete=models.SET_NULL,null=True,blank=True,related_name="services")

    name = models.CharField(max_length=150)

    description = models.TextField(blank=True,null=True)

    price = models.DecimalField(max_digits=10,decimal_places=2)

    duration = models.PositiveIntegerField(help_text="Duration in minutes")

    image = models.ImageField(upload_to="services/",blank=True,null=True)

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.name} - {self.salon.name}"