"""
Authentication service for JWT token generation and validation
"""
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict
from jose import JWTError, jwt
from passlib.context import CryptContext
import secrets


# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    """Service for handling authentication and JWT tokens"""

    def __init__(self, secret_key: str, algorithm: str = "HS256",
                 access_token_expire_minutes: int = 60,
                 refresh_token_expire_days: int = 30):
        """
        Initialize authentication service

        Args:
            secret_key: Secret key for JWT encoding
            algorithm: JWT algorithm (default: HS256)
            access_token_expire_minutes: Access token expiration time
            refresh_token_expire_days: Refresh token expiration time
        """
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.access_token_expire_minutes = access_token_expire_minutes
        self.refresh_token_expire_days = refresh_token_expire_days

        # In production, this should be a database
        # For now, we'll use a simple in-memory dict with API keys
        self._api_keys: Dict[str, Dict] = {
            "demo-api-key": {
                "user_id": "demo-user",
                "tier": "pro",
                "name": "Demo User"
            }
        }

    def verify_api_key(self, api_key: str) -> Optional[Dict]:
        """
        Verify an API key and return user information

        Args:
            api_key: The API key to verify

        Returns:
            User information dict if valid, None otherwise
        """
        return self._api_keys.get(api_key)

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """
        Create a JWT access token

        Args:
            data: Data to encode in the token
            expires_delta: Optional custom expiration time

        Returns:
            Encoded JWT token
        """
        to_encode = data.copy()

        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=self.access_token_expire_minutes)

        to_encode.update({
            "exp": expire,
            "iat": datetime.now(timezone.utc),
            "type": "access"
        })

        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def create_refresh_token(self, data: dict) -> str:
        """
        Create a JWT refresh token

        Args:
            data: Data to encode in the token

        Returns:
            Encoded JWT refresh token
        """
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + timedelta(days=self.refresh_token_expire_days)

        to_encode.update({
            "exp": expire,
            "iat": datetime.now(timezone.utc),
            "type": "refresh"
        })

        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def verify_token(self, token: str, token_type: str = "access") -> Optional[Dict]:
        """
        Verify and decode a JWT token

        Args:
            token: The JWT token to verify
            token_type: Expected token type ("access" or "refresh")

        Returns:
            Decoded token payload if valid, None otherwise
        """
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])

            # Check token type
            if payload.get("type") != token_type:
                return None

            # Check expiration
            exp = payload.get("exp")
            if exp and datetime.fromtimestamp(exp, tz=timezone.utc) < datetime.now(timezone.utc):
                return None

            return payload

        except JWTError:
            return None

    def generate_api_key(self) -> str:
        """
        Generate a new random API key

        Returns:
            A random API key string
        """
        return secrets.token_urlsafe(32)

    def add_api_key(self, api_key: str, user_id: str, tier: str = "free", name: str = "User"):
        """
        Add a new API key (for development/testing)

        Args:
            api_key: The API key to add
            user_id: User ID
            tier: User tier (free, pro, enterprise)
            name: User name
        """
        self._api_keys[api_key] = {
            "user_id": user_id,
            "tier": tier,
            "name": name
        }


# Global instance
_auth_service_instance: Optional[AuthService] = None
_auth_service_secret_key: Optional[str] = None


def get_auth_service(secret_key: Optional[str] = None) -> AuthService:
    """
    Get the global auth service instance

    Args:
        secret_key: Secret key for JWT (first call sets the key)

    Returns:
        AuthService instance
    """
    global _auth_service_instance, _auth_service_secret_key
    
    # Store the secret key on first call
    if secret_key is not None:
        _auth_service_secret_key = secret_key
    
    # Create instance if needed
    if _auth_service_instance is None:
        if _auth_service_secret_key is None:
            # Fallback: use a default key (should not happen in production)
            _auth_service_secret_key = "change-me-in-production-default-key-min-32-chars"
            print("⚠️  Warning: Using default secret key. Set JWT_SECRET_KEY in .env!")
            
        _auth_service_instance = AuthService(secret_key=_auth_service_secret_key)

    return _auth_service_instance
