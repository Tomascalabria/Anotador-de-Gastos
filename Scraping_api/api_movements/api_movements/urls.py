
from django.urls import path
from api_v1.views import (BalanceView, BuySellMovementView, DepositExtractionMovementView, HoldingView, CredentialsView, UserCredentialsView,CompanyDetailView,CompanyCreationView,UpdateBalanceView)
urlpatterns = [
    # ...
    path('credentials/<int:company_id>/<str:user_id>/', UserCredentialsView.as_view(), name='user_credentials'),
    path('credentials/<int:company_id>/', CredentialsView.as_view(), name='credentials'),
    path('balance/<str:company_id>/<str:user_id>/', BalanceView.as_view(), name='balance'),
    path('balance/update/<int:company_id>/<str:user_id>/', UpdateBalanceView.as_view(), name='update_balance'),  # Added URL for UpdateBalanceView
    path('holding/', HoldingView.as_view(), name='holding'),
    path('buy-sell-movement/', BuySellMovementView.as_view(), name='buy_sell_movement'),
    path('deposit-extraction-movement/', DepositExtractionMovementView.as_view(), name='deposit_extraction_movement'),
    path('companies/', CompanyCreationView.as_view(), name='create_company'),
    path('companies/<str:user_id>/', CompanyDetailView.as_view(), name='company_detail'),
    # ...
]