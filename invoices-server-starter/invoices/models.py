from django.db import models


class Countries(models.TextChoices):
    CZECHIA = 'CZECHIA', 'Czechia'
    SLOVAKIA = 'SLOVAKIA', 'Slovakia'


class Person(models.Model):
    name = models.CharField(max_length=100)
    identification_number = models.CharField(max_length=50)
    tax_number = models.CharField(max_length=50, blank=True, null=True)
    account_number = models.CharField(max_length=50)
    bank_code = models.CharField(max_length=20)
    iban = models.CharField(max_length=34, blank=True, null=True)
    telephone = models.CharField(max_length=20)
    mail = models.EmailField()
    street = models.CharField(max_length=100)
    zip = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=10, choices=Countries.choices, default=Countries.CZECHIA)
    note = models.TextField(blank=True, null=True)
    hidden = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.identification_number})"


class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50)
    issued = models.DateField()
    product = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    vat = models.DecimalField(max_digits=5, decimal_places=2)
    note = models.TextField(blank=True, null=True)
    due_date = models.DateField()
    buyer = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='buyer', blank=True, null=True)
    seller = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='seller', blank=True, null=True)

    def __str__(self):
        return f"Invoice {self.invoice_number} - {self.product}"
