import * as admin from 'firebase-admin';

admin.initializeApp({
	credential: admin.credential.cert(
		{
			projectId: process.env.PROJECT_ID,
			privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
			clientEmail: process.env.CLIENT_EMAIL
		}
		
	),
});

export default admin;
