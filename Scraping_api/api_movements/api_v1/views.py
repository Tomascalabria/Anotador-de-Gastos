from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Driver import Driver
from Iol import Iol
from pycocos.main import Cocos
from datetime import datetime

from api_v1.serializers import (
    BalanceSerializer,
    HoldingSerializer,
    BuySellMovementSerializer,
    AccountMovements,
    CredentialsSerializer,
    CompanySerializer,
)
from api_v1.models import (
    Balance,
    Holding,
    BuySellMovement,
    DepositExtractionMovement,
    Credentials,
    Company,
)
from rest_framework.exceptions import NotFound


class CredentialsView(APIView):
    def post(self, request, company_id):
        serializer = CredentialsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(company_id=company_id)
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)



class UserCredentialsView(APIView):
    def get(self, request, company_id, user_id):
        credentials = get_object_or_404(Credentials, company_id=company_id, user_id=user_id)
        print(credentials.password)
        return Response({
            'username': credentials.username,
            'password': credentials.password,
        })

    def post(self, request, company_id, user_id):
        # Check if credentials already exist
        if Credentials.objects.filter(company_id=company_id, user_id=user_id).exists():
            return Response({'message': ' Credentials for this company have already been registered.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CredentialsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(company_id=company_id, user_id=user_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, company_id, user_id):
    # Check if credentials exist
        credentials = get_object_or_404(Credentials, company_id=company_id, user_id=user_id)
    
    # Delete the credentials
        credentials.delete()
        return Response({'message': 'Credentials deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


import locale
from django.utils import timezone

class BalanceView(APIView):
    def get(self, request, company_id, user_id):
        username = request.GET.get('username')
        password = request.GET.get('password')
        
        # Print to debug
        print(f"Username: {username}, Password: {password}")

        if username is None or password is None:
            return Response({'error': 'Invalid username or password'}, status=400)

        balance_instance = Balance.objects.filter(company_id=company_id, user_id=user_id).first()

        if balance_instance is None:
            # Initialize the required drivers and services
            cocos = Cocos(username, password)

            # invertir_online = Iol(driver, username, password)

            if company_id == '1':
                balance_data = cocos.my_portfolio()
                balance_data_ars = balance_data['total']['ars']
                balance_data_usd = balance_data['total']['usd']
                print(balance_data_ars, balance_data_usd)

                # Update the Balance model with both ARS and USD balances
                balance_instance = Balance.objects.create(
                    company_id=company_id,
                    user_id=user_id,
                    balance_ars=balance_data_ars,
                    balance_usd=balance_data_usd,
                    last_updated=timezone.now()
                )
            elif company_id == '2':
                # Rewrite the driver before using invertir online again
                # balance_data = invertir_online.obtenerBalance()
                balance_data_ars = 0  # Replace this with the correct balance_data for USD
                balance_data_usd = 0  # Replace this with the correct balance_data for USD
                balance_instance = Balance.objects.create(
                    company_id=company_id,
                    user_id=user_id,
                    balance_ars=balance_data_ars,
                    balance_usd=balance_data_usd,
                    last_updated=timezone.now()
                )
            else:
                return Response({'error': 'Invalid balance ID'}, status=400)
        locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')

        # Use locale.currency for formatting the balances
        formatted_balance_ars = locale.currency(balance_instance.balance_ars, grouping=True)
        formatted_balance_usd = locale.currency(balance_instance.balance_usd, grouping=True)

        response_data = {
            'balance_ars': formatted_balance_ars,
            'balance_usd': formatted_balance_usd,
            'last_updated': balance_instance.last_updated
        }   

        return Response(response_data)

class UpdateBalanceView(APIView):
    def get(self, request, company_id, user_id):
        username = request.GET.get('username')
        password = request.GET.get('password')

        if username is None or password is None:
            return Response({'error': 'Invalid username or password'}, status=400)

        # Set the locale to 'en_US.UTF-8' (or another suitable locale)
        locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')

        # Initialize the required drivers and services
        cocos = Cocos(username, password)

        # Activate obtenerBalance for the required company
        if company_id == 1:
            balance_data = cocos.my_portfolio()
            balance_ars = balance_data['total']['ars']
            balance_usd = balance_data['total']['usd']
        elif company_id == 2:
            balance_ars = 'invertir_online.obtenerBalance()'  # This line may need to be adjusted based on your requirements
            balance_usd = 'invertir_online.obtenerBalance()'  # Similarly, adjust this line
        else:
            return Response({'error': 'Invalid balance ID'}, status=400)

        if balance_ars is None or balance_usd is None:
            return Response({'error': 'Failed to obtain balance data'}, status=500)

        # Update the balance information in the database
        balance_instance = Balance.objects.filter(company_id=company_id, user_id=user_id).first()
        if balance_instance is not None:
            balance_instance.balance_ars = balance_ars
            balance_instance.balance_usd = balance_usd
            balance_instance.last_updated = datetime.now()
            balance_instance.save()
            


        response_data = {
            'balance_ars': locale.currency(balance_ars, grouping=True),
            'balance_usd': locale.currency(balance_usd, grouping=True),
            'last_updated': datetime.now(),
        }

        return Response(response_data)



class HoldingView(APIView):
    def get(self, request, user_id, company_id):
        username = request.GET.get('username')
        password = request.GET.get('password')

        # Check if there is existing data in the database
        existing_holdings = Holding.objects.filter(user_id=user_id, company_id=company_id)

        if existing_holdings.exists():
            # If there is existing data, serialize and return it
            serializer = HoldingSerializer(existing_holdings, many=True)
        
        
        # If there is no existing data, make the API call to update/create holdings
        cocos = Cocos(username, password)
        holdings_data = cocos.my_portfolio()
        
        total_ars = holdings_data['total']['ars']

        # Get the Company instance
        company_instance = Company.objects.get(id=company_id)

        # Create a list to store holding instances
        holding_instances = []

        # Loop through the 'tickers' section and create holding instances
        for holding_data in holdings_data['tickers']:
            print(f"Processing holding data: {holding_data}")

            # Skip 'AR$' and 'US$ MEP' tickers
            if holding_data['ticker'] in ['AR$', 'US$ MEP']:
                continue

            holding_instance = Holding(
                user_id=user_id,
                company_id=company_instance,
                ticker=holding_data['ticker'],
                price=holding_data['last'],
                variation=holding_data['variation'],
                quantity=holding_data['quantity'],
                amount=holding_data['amount'],
                weight=0,  # You can calculate weight here if needed
                
            )

            # Calculate the weight and set it in the model
            if total_ars > 0:
                holding_instance.weight = (holding_data['amount'] / total_ars) * 100

            # Print the values before saving
            print(f"Before saving: {holding_instance}")

            # Append the holding instance to the list
            holding_instances.append(holding_instance)

        # Save all the new holding instances
        Holding.objects.bulk_create(holding_instances)

        # Serialize and return the updated holdings
        serializer = HoldingSerializer(holding_instances, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def post(self, request, user_id, company_id):
        username = str(request.data.get('username'))
        password = str(request.data.get('password'))
        print(username,password)
        # Check if there is existing data in the database
        existing_holdings = Holding.objects.filter(user_id=user_id, company_id=company_id)

        # If there is no existing data, return a 404 response
        if not existing_holdings.exists():
                pass
        # If there is existing data, make the API call to update holdings
        cocos = Cocos(username, password,{})
        holdings_data = cocos.my_portfolio()

        total_ars = holdings_data['total']['ars']

        # Get the Company instance
        company_instance = Company.objects.get(id=company_id)

        # Loop through the 'tickers' section and update existing holding instances
        for holding_data in holdings_data['tickers']:
            print(f"Processing holding data: {holding_data}")

            # Skip 'AR$' and 'US$ MEP' tickers
            if holding_data['ticker'] in ['AR$', 'US$ MEP']:
                continue

            # Try to get the existing holding instance
            holding_instance = existing_holdings.filter(ticker=holding_data['ticker']).first()

            if holding_instance:
                # If the holding instance exists, update its fields
                holding_instance.price = holding_data['last']
                holding_instance.variation = holding_data['variation']
                holding_instance.quantity = holding_data['quantity']
                holding_instance.amount = holding_data['amount']

                # Calculate the weight and set it in the model
                if total_ars > 0:
                    holding_instance.weight = (holding_data['amount'] / total_ars) * 100

                # Save the updated holding instance
                holding_instance.save()
            else:
                # If the holding instance does not exist, create a new one
                holding_instance = Holding(
                    user_id=user_id,
                    company_id=company_instance,
                    ticker=holding_data['ticker'],
                    price=holding_data['last'],
                    variation=holding_data['variation'],
                    quantity=holding_data['quantity'],
                    amount=holding_data['amount'],
                    weight=0,  # You can calculate weight here if needed
                )

                # Calculate the weight and set it in the model
                if total_ars > 0:
                    holding_instance.weight = (holding_data['amount'] / total_ars) * 100

                # Save the new holding instance
                holding_instance.save()

        # Serialize and return the updated holdings
        serializer = HoldingSerializer(existing_holdings, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AccountMovements(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        cocos=Cocos(username,password,{})

        current_date = datetime.now().strftime('%Y-%m-%d')
        transactions = cocos.account_activity('1999-01-01', current_date)
        deposits = []
        withdrawls = []
        
        for transaction in transactions:
            type_value = transaction.get("type")
            amount_value = transaction.get("amount")
            
            if type_value == "DEPOSIT":
                deposits.append(amount_value)
            elif type_value == "WITHDRAWAL":
                withdrawls.append(amount_value)
            else:
                pass

        total_invested = sum(deposits) - sum(withdrawls)
        print(f'deposits: ${sum(deposits)}')
        print(f'withdrawls: ${sum(withdrawls)}')
        return Response({"total_invested": total_invested}, status=200)


            


import requests
import json
import urllib3
urllib3.disable_warnings()
import pandas as pd
class GetMarketDataView(APIView):
    def get(self, request):

     s = requests.session()
     s.get('https://open.bymadata.com.ar/#/dashboard', verify=False)
     
     ## Fuerzo los headers que necesito (no se si es indispensable, pero asi me funciono)
     headers = {
         'Connection': 'keep-alive',
         'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json',
         'sec-ch-ua-mobile': '?0',
         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
         'sec-ch-ua-platform': '"Windows"',
         'Origin': 'https://open.bymadata.com.ar',
         'Sec-Fetch-Site': 'same-origin',
         'Sec-Fetch-Mode': 'cors',
         'Sec-Fetch-Dest': 'empty',
         'Referer': 'https://open.bymadata.com.ar/',
         'Accept-Language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7',
     }
     
     data = '{"excludeZeroPxAndQty":false,"T2":true,"T1":false,"T0":false,"Content-Type":"application/json"}' ## excluir especies sin precio y cantidad, determina plazo de listado
     response = s.post('https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/leading-equity', headers=headers, data=data)
     panel_acciones_lideres = json.loads(response.text)
     df_panel_acciones_lideres = pd.DataFrame(panel_acciones_lideres['data'])
     
     df_panel_acciones_lideres = df_panel_acciones_lideres.fillna('')

     data = '{"excludeZeroPxAndQty":false,"T2":true,"T1":false,"T0":false,"Content-Type":"application/json"}' ## excluir especies sin precio y cantidad, determina plazo de listado
     response = s.post('https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/general-equity', headers=headers, data=data)
     panel_acciones_general = json.loads(response.text)
     df_panel_acciones_general = pd.DataFrame(panel_acciones_general['data'])
     df_panel_acciones_general=df_panel_acciones_general.fillna('')


     df_merged=pd.concat([df_panel_acciones_lideres, df_panel_acciones_general])
     df_merged=df_merged.fillna('')
     print(df_merged)
     return Response(df_merged)

     
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
    def get(self, request, user_id):
        # Retrieve the credentials for the specified user_id
        credentials = Credentials.objects.filter(user_id=user_id)

        # Retrieve the companies associated with the credentials
        companies = Company.objects.filter(credentials__in=credentials)

        serializer = CompanySerializer(companies, many=True)
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
