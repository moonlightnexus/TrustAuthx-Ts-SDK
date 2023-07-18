# My SDK

My SDK is a JavaScript/TypeScript library for interacting with the TrustAuthX API.

## Installation

You can install My SDK using npm:


## Usage

First, import the `AuthLiteClient` class from the `my-sdk` package:

```javascript
import { AuthLiteClient } from 'my-sdk';


Next, create an instance of the AuthLiteClient class, passing in your API key, secret key, and organization ID:

const client = new AuthLiteClient({
  apiKey: 'your-api-key',
  secretKey: 'your-secret-key',
  orgId: 'your-org-id',
});

You can now use the client object to interact with the TrustAuthX API. For example, to generate an authentication URL:

const url = client.generateUrl();

Or to get user information using an authentication token:

const user = await client.getUser('your-auth-token');

API Reference
AuthLiteClient
The AuthLiteClient class provides methods for interacting with the TrustAuthX API.

constructor({ apiKey, secretKey, orgId })
Creates a new instance of the AuthLiteClient class.

apiKey: Your TrustAuthX API key.
secretKey: Your TrustAuthX secret key.
orgId: Your TrustAuthX organization ID.
generateUrl()
Generates an authentication URL for the given organization.

Returns a string containing the authentication URL.

getUser(token)
Validates the given authentication token and returns user information.

token: The authentication token to validate.
Returns a promise that resolves to an object containing user information.

getAccessTokenFromRefreshToken(refreshToken)
Gets an access token using the given refresh token.

refreshToken: The refresh token to use.
Returns a promise that resolves to an object containing the access token.

validateAccessToken(accessToken)
Validates the given access token.

accessToken: The access token to validate.
Returns a promise that resolves to a boolean indicating whether the access token is valid.


This README provides instructions on how to install and use the SDK.
