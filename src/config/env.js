// Why this way - ?
// every time import.meta.env.VITE*****
// is very unprofessional
// here we store in object and ensure it is string
const env = {
    appwriteEndPoint: String(import.meta.env.VITE_APPWRITE_END_POINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDBID: String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMce: String(import.meta.env.VITE_TINY_MCE),
};

export default env;
