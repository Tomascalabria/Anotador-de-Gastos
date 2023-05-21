from django.db import models

class Balance(models.Model):
    balance = models.DecimalField(max_digits=10, decimal_places=2)

class Holding(models.Model):
    ticker = models.CharField(max_length=50)
    variation = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    quantity = models.CharField(max_length=50)
    amount = models.CharField(max_length=50)

class BuySellMovement(models.Model):
    ticker = models.CharField(max_length=50)
    operation = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    day = models.CharField(max_length=50)
    quantity = models.CharField(max_length=50)
    total_movement = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

class DepositExtractionMovement(models.Model):
    ticker = models.CharField(max_length=50)
    operation = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    day = models.CharField(max_length=50)
    quantity = models.CharField(max_length=50)
    total_movement = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
