import { Client, Databases, ID, Query, Storage } from "appwrite";
import env from "../../config/env";

class Service {
    client = new Client();
    account;
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(env.appwriteEndPoint)
            .setProject(env.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost(
        postData = {
            title: "",
            content: "",
            status: false,
            featured_image: "",
            slug: "",
            user_id: "",
        }
    ) {
        const { title, content, status, featured_image, slug, user_id } =
            postData;
        try {
            const post = await this.databases.createDocument(
                env.appwriteDBID,
                env.appwriteCollectionID,
                ID.unique(),
                {
                    title,
                    content,
                    featured_image,
                    status,
                    user_id,
                }
            );
            if (post) return post;
            else return null;
        } catch (error) {
            console.log(`appwrite :: createPost :: error ${error}`);
        }
    }

    async updatePost(
        doucmentId,
        postData = {
            title: "",
            content: "",
            status: false,
            featured_image: "",
            slug: "",
        }
    ) {
        const { title, content, status, featured_image, slug } = postData;
        try {
            const post = await this.databases.updateDocument(
                env.appwriteDBID,
                env.appwriteCollectionID,
                doucmentId,
                {
                    title,
                    content,
                    featured_image,
                    status,
                }
            );
            if (post) return post;
            else return null;
        } catch (error) {
            console.log(`appwrite :: updatePost :: error ${error}`);
        }
    }

    async deletePost(doucmentId) {
        try {
            const res = await this.databases.deleteDocument(
                env.appwriteDBID,
                env.appwriteCollectionID,
                doucmentId
            );
            if (res) return true;
        } catch (error) {
            console.log(`appwrite :: deletePost :: error ${error}`);
            return false;
        }
    }

    async getPost(doucmentId) {
        try {
            return this.databases.getDocument(
                env.appwriteDBID,
                env.appwriteCollectionID,
                doucmentId
            );
        } catch (error) {
            console.log(`appwrite :: getPost :: error ${error}`);
            return false;
        }
    }

    // Allow for more open query
    async getAllPost(queries = [Query.equal("status", true)]) {
        try {
            return this.databases.listDocuments(
                env.appwriteDBID,
                env.appwriteCollectionID,
                queries
            );
        } catch (error) {
            console.log(`appwrite :: getAllPost :: error ${error}`);
            return false;
        }
    }

    // upload file
    async fileUpload(file) {
        try {
            return await this.storage.createFile(
                env.appwriteBucketID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log(`appwrite :: fileUpload :: error ${error}`);
            return false;
        }
    }

    // delete file
    async fileDelete(fileId) {
        try {
            await this.storage.deleteFile(env.appwriteBucketID, fileId);
            return true;
        } catch (error) {
            console.log(`appwrite :: fileDelete :: error ${error}`);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFileView(env.appwriteBucketID, fileId);
    }
}

const service = new Service();

export { service, Service };
