from django.urls import path
from api_v1.views import BalanceView, BuySellMovementView, DepositExtractionMovementView

urlpatterns = [
    # ...
    path('balance/<str:id>/', BalanceView.as_view(), name='balance'),
    path('buy-sell-movement/', BuySellMovementView.as_view(), name='buy_sell_movement'),
    path('deposit-extraction-movement/', DepositExtractionMovementView.as_view(), name='deposit_extraction_movement'),
    # ...
]
