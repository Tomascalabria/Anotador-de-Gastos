from django.shortcuts import render
from django.http import JsonResponse
from django.http import request
from rest_framework.views import APIView
from rest_framework.response import Response
from api_v1.serializers import BalanceSerializer, HoldingSerializer, BuySellMovementSerializer, DepositExtractionMovementSerializer
from api_v1.models import Balance, Holding, BuySellMovement, DepositExtractionMovement  # Import the models
from Cocos import Cocos
from Driver import Driver

class BalanceView(APIView):
    def get(self, request):
        username = request.GET.get('username')
        password = request.GET.get('password')

        if username is None or password is None:
            return Response({'error': 'Invalid username or password'}, status=400)

        driver = Driver()
        cocos = Cocos(driver, username, password)
        balance_data = cocos.obtenerBalance()

        if balance_data is None:
            return Response({'error': 'Failed to obtain balance data'}, status=500)

        balance_instance = Balance(balance=balance_data['Balance'])
        balance_instance.save()

        serializer = BalanceSerializer(balance_instance)

        return Response(serializer.data)


class HoldingView(APIView):
    def get(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        driver = Driver()
        cocos = Cocos(driver, username, password)
        holdings_data = cocos.obtenerHoldings()

        # Create a new instance of Holding model for each holding and save them
        for holding_data in holdings_data:
            holding_instance = Holding(
                ticker=holding_data['ticker'],
                variation=holding_data['variation'],
                price=holding_data['price'],
                quantity=holding_data['quantity'],
                amount=holding_data['amount']
            )
            holding_instance.save()

        serializer = HoldingSerializer(holdings_data, many=True)

        return Response(serializer.data)

# Similarly, you can create the views for BuySellMovement and DepositExtractionMovement

class BuySellMovementView(APIView):
    def get(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        driver = Driver()
        cocos = Cocos(driver, username, password)
        buy_sell_movements_data = cocos.obtenerTodosMovimientos()

        # Create a new instance of BuySellMovement model for each movement and save them
        for movement_data in buy_sell_movements_data['BuySellMovements']:
            movement_instance = BuySellMovement(
                ticker=movement_data['ticker'],
                operation=movement_data['operation'],
                type=movement_data['type'],
                day=movement_data['day'],
                quantity=movement_data['quantity'],
                total_movement=movement_data['total_movement'],
                status=movement_data['status']
            )
            movement_instance.save()

        serializer = BuySellMovementSerializer(buy_sell_movements_data['BuySellMovements'], many=True)

        return Response(serializer.data)
class DepositExtractionMovementView(APIView):
    def get(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        driver = Driver()
        cocos = Cocos(driver, username, password)
        deposit_extraction_movements_data = cocos.obtenerTodosMovimientos()

        # Create a new instance of DepositExtractionMovement model for each movement and save them
        for movement_data in deposit_extraction_movements_data['DepositExtractionMovements']:
            movement_instance = DepositExtractionMovement(
                ticker=movement_data['ticker'],
                operation=movement_data['operation'],
                type=movement_data['type'],
                day=movement_data['day'],
                quantity=movement_data['quantity'],
                total_movement=movement_data['total_movement'],
                status=movement_data['status']
            )
            movement_instance.save()

        serializer = DepositExtractionMovementSerializer(deposit_extraction_movements_data['DepositExtractionMovements'], many=True)

        return Response(serializer.data)
