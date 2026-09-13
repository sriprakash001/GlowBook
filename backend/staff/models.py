from django.conf import settings
from django.db import models

from salons.models import Salon


class Staff(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="staff_profile"
    )

    salon = models.ForeignKey(
        Salon,
        on_delete=models.CASCADE,
        related_name="staff_members"
    )

    designation = models.CharField(
        max_length=100,
        default="Stylist"
    )

    bio = models.TextField(
        blank=True,
        null=True
    )

    experience_years = models.PositiveIntegerField(
        default=0
    )

    image = models.ImageField(
        upload_to="staff/",
        blank=True,
        null=True
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.salon.name}"

class WorkingHour(models.Model):

    DAYS = (
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
        (6, "Sunday"),
    )

    staff = models.ForeignKey(
        Staff,
        on_delete=models.CASCADE,
        related_name="working_hours"
    )

    day_of_week = models.IntegerField(
        choices=DAYS
    )

    start_time = models.TimeField()

    end_time = models.TimeField()

    is_available = models.BooleanField(
        default=True
    )

    class Meta:

        unique_together = (
            "staff",
            "day_of_week",
        )

    def __str__(self):
        return (
            f"{self.staff.user.username} - "
            f"{self.get_day_of_week_display()}"
        )
    
class StaffLeave(models.Model):

    staff = models.ForeignKey(
        Staff,
        on_delete=models.CASCADE,
        related_name="leaves"
    )

    start_date = models.DateField()

    end_date = models.DateField()

    reason = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.staff.user.username}: "
            f"{self.start_date} - {self.end_date}"
        )