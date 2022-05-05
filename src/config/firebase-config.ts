import * as admin from 'firebase-admin';


admin.initializeApp({
	credential: admin.credential.cert({
		clientEmail: process.env.CLIENT_EMAIL,
		privateKey: process.env.PRIVATE_KEY,
		projectId: process.env.PROJECT_ID
	}),
});

export default admin;
