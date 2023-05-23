from django.db import models
from Encrypt import EncryptedPasswordField

class CocosCredentials(models.Model):
    user_id = models.IntegerField()
    company_id = models.IntegerField()
    username = models.CharField(max_length=255)
    password = EncryptedPasswordField(max_length=255)

class IoLCredentials(models.Model):
    user_id = models.IntegerField()
    company_id = models.IntegerField()
    username = models.CharField(max_length=255)
    password = EncryptedPasswordField(max_length=255)

class Balance(models.Model):
    company_id = models.IntegerField()
    user_id = models.IntegerField()
    balance = models.DecimalField(max_digits=10, decimal_places=2)

class Holding(models.Model):
    ticker = models.CharField(max_length=50)
    variation = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    quantity = models.CharField(max_length=50)
    amount = models.CharField(max_length=50)
    company_id = models.IntegerField()
    user_id = models.IntegerField()

class BuySellMovement(models.Model):
    ticker = models.CharField(max_length=50)
    operation = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    day = models.CharField(max_length=50)
    quantity = models.CharField(max_length=50)
    total_movement = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    company_id = models.IntegerField()
    user_id = models.IntegerField()

class DepositExtractionMovement(models.Model):
    ticker = models.CharField(max_length=50)
    operation = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    day = models.CharField(max_length=50)
    quantity = models.CharField(max_length=50)
    total_movement = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    company_id = models.IntegerField()
    user_id = models.IntegerField()
