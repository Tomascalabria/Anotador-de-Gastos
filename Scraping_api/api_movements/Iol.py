from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
import re


import time
from tabulate import tabulate
from Driver import Driver
from datetime import datetime


class Iol:
    def __init__(self, driver, usuario, contraseña):
        self.usuario = usuario
        self.driver = driver
        self._url_main = 'https://micuenta.invertironline.com/ingresar?'
        self._url_wallet = ''
        self._url_movements='https://app.cocos.capital/movements/history'
        self.contraseña = contraseña
    
    def start(self):
        self.driver._driver.get(self._url_main)
        self.driver._driver.fullscreen_window()

        # Find the banner element using CSS selector
        user_input = self.driver._driver.find_element(By.ID, 'usuario').send_keys(self.usuario)
        password_input = self.driver._driver.find_element(By.ID, 'password').send_keys(self.contraseña)
        btn = self.driver._driver.find_element(By.XPATH, '/html/body/div[1]/div[5]/div/div/div[1]/div/form/div[2]/div/input').click()
        time.sleep(5)
        
    def obtenerBalance(self):
        self.start()

        # Proceed with retrieving the element or performing actions on it

        value_element = self.driver._driver.find_element(By.XPATH, '/html/body/div[1]/div[3]/div/div/div/div[1]/div[1]/div[1]/div[2]/a')
        balance = value_element.text
        balance = re.sub(r'[^0-9]', '', balance)


        print(balance)
        return balance
    
    def obtenerTodosMovimientos(self):
        new_date = '11041999'
        time.sleep(4)
        self.start()
        self.driver._driver.get(self._url_movements)
        time.sleep(4)
        btn = self.driver._driver.find_element(By.XPATH, '/html/body/div[1]/div[1]/div/div/main/div[2]/div[1]/div/div/div[1]').click()
        date_input = self.driver._driver.find_element(By.ID, "outlined-adornment-weight")
    
        # Enter a new date value
        date_input.send_keys(new_date)
        time.sleep(1)
    
        # Click on the Apply Filters button
        apply_filters = self.driver._driver.find_element(By.XPATH, '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/button')
        apply_filters.click()
        time.sleep(20)
    
        # Simulate keyboard event to close the filter or overlay element
        actions = ActionChains(self.driver._driver)
        time.sleep(13)
        actions.send_keys(Keys.ESCAPE)
        actions.perform()
    
        # Extract the movements data using Selenium
        movements = self.driver._driver.find_elements(By.XPATH, "//div[@class='grid-desktop']")
    
        time.sleep(5)
        buy_sell_data = []
        deposit_extraction_data = []
        
        for row in movements:
            cells = row.find_elements(By.TAG_NAME, 'span')
            operation_parts = cells[0].text.split()
            ticker = operation_parts[0]
            if len(operation_parts) > 1:
                operation = operation_parts[1]
                type = cells[1].text
                day = cells[2].text
                quantity = cells[3].text if cells[3].text else ""
                total_movement = cells[4].text
                status = cells[5].text
                buy_sell_data.append({'Ticker': ticker, 'Operación': operation, 'Tipo': type, 'Día': day, 'Cantidad': quantity, 'Total Movimiento': total_movement, 'Estado': status})
            else:
                operation = cells[1].text
                type = ""  # Add an empty string for type in deposits/extractions
                day = cells[2].text
                quantity = cells[3].text if cells[3].text else ""
                total_movement = cells[4].text
                status = cells[5].text
                deposit_extraction_data.append({'Ticker': ticker, 'Operación': operation, 'Tipo': type, 'Día': day, 'Cantidad': quantity, 'Total Movimiento': total_movement, 'Estado': status})
        
        response = {
            'BuySellMovements': buy_sell_data,
            'DepositExtractionMovements': deposit_extraction_data
        }
        
        return response

