from django.db import models
from cryptography.fernet import Fernet

# Create a Fernet cipher object with a secret key
cipher = Fernet(Fernet.generate_key())

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
    # Other fields in your model
    
    # Example fields using the EncryptedPasswordField
    cocos_password = EncryptedPasswordField(blank=True, null=True)
    IoL_password = EncryptedPasswordField(blank=True, null=True)
    
    # Other fields in your model

    def save(self, *args, **kwargs):
        # Decrypt the encrypted fields before saving
        self.cocos_password = self.cocos_password.decrypt()
        self.IoL_password = self.IoL_password.decrypt()

        super().save(*args, **kwargs)
