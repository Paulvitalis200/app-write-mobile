import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66c664f0003a3d25782f',
    databaseId: '66c665b70020977bea0c',
    userCollectionId: '66c665d6003abf29ac66',
    videoCollectionId: '66c665f2002901fbbf0d',
    storageId: '66c667760017c18b75f9'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)


export const createUser = async (email:any, password:any, username:any) => {
    // Register User

    try {

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username

        )

        if (!newAccount) throw  Error
        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
            
        )

        return newUser
    } catch(error:any) {
        console.log(error)
        throw new Error(error)
    }
}




export const signIn = async (email:any, password:any ) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch(error:any) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}
