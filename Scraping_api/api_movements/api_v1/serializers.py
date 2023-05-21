from rest_framework import serializers
from api_v1.models import Balance, Holding, BuySellMovement, DepositExtractionMovement

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('balance',)

class HoldingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holding
        fields = ('ticker', 'variation', 'price', 'quantity', 'amount')

class BuySellMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuySellMovement
        fields = ('ticker', 'operation', 'type', 'day', 'quantity', 'total_movement', 'status')

class DepositExtractionMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositExtractionMovement
        fields = ('ticker', 'operation', 'type', 'day', 'quantity', 'total_movement', 'status')
