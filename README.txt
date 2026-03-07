AMS - Artist Management System
It have two part:
	ams_frontend: reactjs project for handling frontend.
	amd_backend: java spring project for handling backend.

Two extra file are need while are not kept in git due to security reason.
They are .env files.

The first file is for frontend which is to be 
kept inside ams_frontend folder in same hierarchy as that of src folder. It's content is as:-

VITE_PUBLIC_BASE_URL=YOUR_BACKEND_URL:PORT 

Here the example is as
VITE_PUBLIC_BASE_URL=http://127.0.0.1:8080

The second .env is to be kept inside amd_backend in same hierarchy as that of src folder. It's content is as:-

DB_URL=YOUR_DATABASE_URL # eg. jdbc:mysql://localhost:3306/AMS?allowPublicKeyRetrieval=true&useSSL=false
DB_USERNAME=YOUR_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
SERVER_PORT=PORT_FOR_RUNNING_BACKEND # eg. 8080
JWT_TOKEN_KEY=text_or_256_byte_key_for_encryption_which_can_be_anything
