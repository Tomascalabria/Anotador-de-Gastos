from django.shortcuts import render
from django.http import JsonResponse
from django.http import request
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from api_v1.serializers import BalanceSerializer, HoldingSerializer, BuySellMovementSerializer, DepositExtractionMovementSerializer,CocosCredentialsSerializer,IoLCredentialsSerializer
from api_v1.models import Balance, Holding, BuySellMovement, DepositExtractionMovement  # Import the models
from Cocos import Cocos
from Driver import Driver
from Iol import Iol
from api_v1.models import CocosCredentials, IoLCredentials


from rest_framework.exceptions import NotFound

class CredentialsView(APIView):
    def post(self, request, company_id):
        if company_id == '1':
            credentials = CocosCredentials.objects.filter(company_id=company_id).first()
            serializer = CocosCredentialsSerializer(credentials, data=request.data)
        elif company_id == '2':
            credentials = IoLCredentials.objects.filter(company_id=company_id).first()
            serializer = IoLCredentialsSerializer(credentials, data=request.data)
        else:
            return Response({'error': 'Company  id not supported'}, status=400)

        if not credentials:
            raise NotFound("Credentials not found")

        if serializer.is_valid():
            serializer.save(company_id=company_id)
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)

class UserCredentialsView(APIView):
    def get(self, company_id):
        if company_id == '1':
            credentials = get_object_or_404(CocosCredentials, company_id=company_id)
        elif company_id == '2':
            credentials = get_object_or_404(IoLCredentials, company_id=company_id)
        else:
            return JsonResponse({'error': 'Company type not supported'}, status=400)

        return JsonResponse({
            'username': credentials.username,
            'password': credentials.password,  # Note: This is the encrypted password
        })


class BalanceView(APIView):
    def get(self, request, id):
        username = request.GET.get('username')
        password = request.GET.get('password')

        if username is None or password is None:
            return Response({'error': 'Invalid username or password'}, status=400)

        driver = Driver()
        cocos = Cocos(driver, username, password)
        invertir_online = Iol(driver, username, password)

        if id == '1':
            balance_data = cocos.obtenerBalance()
        elif id == '2':
            balance_data = invertir_online.obtenerBalance()
        else:
            return Response({'error': 'Invalid balance ID'}, status=400)

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
