from django.conf import settings
from django.db import models

from salons.models import Salon
from services.models import Service
from staff.models import Staff


class Appointment(models.Model):

    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
        ("no_show", "No Show"),
    )

    customer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="appointments")

    salon = models.ForeignKey(Salon,on_delete=models.CASCADE,related_name="appointments")

    service = models.ForeignKey(Service,on_delete=models.PROTECT,related_name="appointments")

    staff = models.ForeignKey(Staff,on_delete=models.PROTECT,related_name="appointments")

    appointment_date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    price = models.DecimalField(max_digits=10,decimal_places=2)

    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default="pending")

    customer_note = models.TextField(blank=True,null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:

        ordering = [
            "-appointment_date",
            "-start_time",
        ]

    def __str__(self):
        return (
            f"{self.customer.username} - "
            f"{self.service.name} - "
            f"{self.appointment_date}"
        )