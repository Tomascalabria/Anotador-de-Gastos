from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains

import time
from tabulate import tabulate
from Driver import Driver
from datetime import datetime


class Cocos:
    def __init__(self, driver, usuario, contraseña):
        self.usuario = usuario
        self.driver = driver
        self._url_main = 'https://app.cocos.capital/login'
        self._url_wallet = 'https://app.cocos.capital/wallet'
        self._url_movements='https://app.cocos.capital/movements/history'
        self.contraseña = contraseña
    
    def start(self):
        self.driver._driver.get(self._url_main)
        self.driver._driver.fullscreen_window()

        # Find the banner element using CSS selector
        user_input = self.driver._driver.find_element(By.XPATH, '/html/body/div[1]/div[1]/div[2]/div[2]/div[1]/div/input').send_keys(self.usuario)
        password_input = self.driver._driver.find_element(By.XPATH, '/html/body/div[1]/div[1]/div[2]/div[2]/div[2]/div/input').send_keys(self.contraseña)
        btn = self.driver._driver.find_element(By.XPATH, '/html/body/div[1]/div[1]/div[2]/div[3]/button').click()
        time.sleep(5)
        
    def obtenerBalance(self):
        self.start()
        self.driver._driver.get(self._url_wallet)
        time.sleep(10)
        wait(self.driver._driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.heading-porftolio')))

        # Proceed with retrieving the element or performing actions on it
        element = self.driver._driver.find_element(By.CSS_SELECTOR, '.heading-porftolio')

        portfolio_heading = self.driver._driver.find_element(By.CLASS_NAME, 'heading-porftolio')
        value_element = portfolio_heading.find_element(By.CLASS_NAME, 'MuiTypography-heading3_bold')
        balance = value_element.text

        holding_rows = self.driver._driver.find_elements(By.CLASS_NAME, 'comp-holding-row-desktop')

        data = []

        for row in holding_rows:
            ticker_element = row.find_element(By.CLASS_NAME, 'short_ticker')
            ticker = ticker_element.find_element(By.CLASS_NAME, 'MuiTypography-textS').text

            variation_element = row.find_element(By.CLASS_NAME, 'last')
            variation = variation_element.find_element(By.CLASS_NAME, 'MuiTypography-textS').text

            price_element = row.find_element(By.CSS_SELECTOR, '.grid-col:nth-child(4) > span')
            price = price_element.text

            quantity_element = row.find_element(By.CSS_SELECTOR, '.grid-col:nth-child(5) > span')
            quantity = quantity_element.text

            amount_element = row.find_element(By.CSS_SELECTOR, '.amount-container .MuiTypography-textS')
            amount = amount_element.text

            data.append({'Ticker': ticker, 'Variation': variation, 'Price': f'${price}', 'Quantity': quantity, 'Amount': f'${amount}'})

        response = {
            'Balance': balance,
            'Holdings': data
        }

        return response
    
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

