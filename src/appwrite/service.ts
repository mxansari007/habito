import { ID,Account, Client } from 'appwrite'
import Config from 'react-native-config'

import Snackbar from 'react-native-snackbar'

const appwWriteClient = new Client();

const APPWRITE_ENDPOINT:string = Config.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID:string = Config.APPWRITE_PROJECT_ID;

class AppwriteService {
    account;

    constructor() {
        appwWriteClient
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwWriteClient)
    }
}