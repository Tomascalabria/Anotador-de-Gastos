from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from api_v1.serializers import (
    BalanceSerializer,
    HoldingSerializer,
    BuySellMovementSerializer,
    DepositExtractionMovementSerializer,
    CocosCredentialsSerializer,
    IoLCredentialsSerializer,
    CompanySerializer,
)
from api_v1.models import (
    Balance,
    Holding,
    BuySellMovement,
    DepositExtractionMovement,
    CocosCredentials,
    IoLCredentials,
    Company,
)
from Cocos import Cocos
from Driver import Driver
from Iol import Iol
from rest_framework.exceptions import NotFound


class CredentialsView(APIView):
    def post(self, request, company_id):
        if company_id == '1' or company_id == 1:
            serializer = CocosCredentialsSerializer(data=request.data)
        elif company_id == '2' or company_id == 2:
            serializer = IoLCredentialsSerializer(data=request.data)
        else:
            return Response({'error': 'Company ID not supported'}, status=400)

        if serializer.is_valid():
            serializer.save(company_id=company_id)
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)


class UserCredentialsView(APIView):
    def get(self, request, company_id, user_id):
        if company_id == 1 or company_id == '1':
            credentials = get_object_or_404(CocosCredentials, company_id=company_id, user_id=user_id)
        elif company_id == 2 or company_id == '2':
            credentials = get_object_or_404(IoLCredentials, company_id=company_id, user_id=user_id)
        else:
            return Response({'error': 'Company type not supported'}, status=400)

        return Response({
            'username': credentials.username,
            'password': credentials.password,
            # Password field automatically decrypted by EncryptedPasswordField
        })

    def post(self, request, company_id, user_id):
        if company_id == 1 or company_id == '1':
            serializer = CocosCredentialsSerializer(data=request.data)
        elif company_id == 2 or company_id == '2':
            serializer = IoLCredentialsSerializer(data=request.data)
        else:
            return Response({'error': 'Company ID not supported'}, status=400)

        if serializer.is_valid():
            serializer.save(company_id=company_id, user_id=user_id)
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)


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
    def post(self, request):
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


class BuySellMovementView(APIView):
    def post(self, request):
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
    def post(self, request):
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


class CompanyView(APIView):
    def get(self, request):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)


class CompanyCreationView(APIView):
    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class CompanyDetailView(APIView):
    def get(self, request, name):
        company = get_object_or_404(Company, name=name)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    def put(self, request, name):
        company = get_object_or_404(Company, name=name)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, name):
        company = get_object_or_404(Company, name=name)
        company.delete()
        return Response(status=204)
