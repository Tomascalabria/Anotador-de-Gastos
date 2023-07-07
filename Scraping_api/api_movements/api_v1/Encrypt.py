from django.db import models
from cryptography.fernet import Fernet
import os 
KEY_FILE_PATH = 'fernet_key.txt'

if not os.path.exists(KEY_FILE_PATH):
    # Generate a new Fernet key
    cipher = Fernet.generate_key()
    
    # Save the key to a file for future use
    with open(KEY_FILE_PATH, 'wb') as key_file:
        key_file.write(cipher)
else:
    # Load the existing Fernet key from the file
    with open(KEY_FILE_PATH, 'rb') as key_file:
        cipher = key_file.read()

cipher = Fernet(cipher)


class EncryptedPasswordField(models.CharField):
    def from_db_value(self, value, expression, connection):
        if value:
            decrypted_value = cipher.decrypt(value.encode()).decode()
            return decrypted_value
        return value

    def to_python(self, value):
        if value:
            return value
        return None

    def get_prep_value(self, value):
        if value:
            encrypted_value = cipher.encrypt(value.encode()).decode()
            return encrypted_value
        return value

class EncryptedModel(models.Model):
    cocos_password = EncryptedPasswordField(max_length=100, blank=True, null=True)
    IoL_password = EncryptedPasswordField(max_length=100, blank=True, null=True)