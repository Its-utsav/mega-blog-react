import { Account, Client, ID } from "appwrite";
import env from "../../config/env";

// ------------------------------------------------------
// This is vender locking LOL
// ------------------------------------------------------
// const client = new Client()
//     .setEndpoint(env.appwriteEndPoint)
//     .setProject(env.appwriteProjectId);

// const account = new Account(client);

// const user = await account.create(ID.unique())
// ------------------------------------------------------

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(env.appwriteEndPoint)
            .setProject(env.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ name, email, password }) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (user) {
                // login the user
                this.login({ email, password });
                return user;
            } else {
                return user;
            }
        } catch (error) {
            console.error(`appwrite :: signin :: error ${error}`);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const user = await this.account.createEmailPasswordSession(
                email,
                password
            );
            if (user) return user;
            else null;
        } catch (error) {
            console.error(`appwrite :: login :: error ${error}`);
            throw error;
        }
    }

    async getUserInfo() {
        try {
            const user = await this.account.get();
            if (user) return user;
            else return null;
        } catch (error) {
            console.error(`appwrite :: getUserInfo :: error ${error}`);
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions(); // logout from all users sessions
        } catch (error) {
            console.error(`appwrite :: logout :: error ${error}`);
        }
    }
}
const authService = new AuthService();

export { AuthService, authService };
