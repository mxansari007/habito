import { ID,Account, Client } from 'appwrite'
import Config from 'react-native-config'

import Snackbar from 'react-native-snackbar'
import { App } from 'realm';

const appwWriteClient = new Client();

const APPWRITE_ENDPOINT:string = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID:string = '668638890017c55c3935';

class AppwriteService {
    account;

    constructor() {
        appwWriteClient
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwWriteClient)
    }


    //create a new record

    async createRecord({phone,name}:any){
        try {
            const userAccount = await this.account.createPhoneToken(
                ID.unique(),
                phone,
                name,
                
            )

            if(userAccount){
                Snackbar.show({
                    text:'Account Created Successfully',
                    duration:Snackbar.LENGTH_SHORT
                })
            }else{
                Snackbar.show({
                    text:'Failed to create account',
                    duration:Snackbar.LENGTH_SHORT
                })
            }

        } catch (error) {
            Snackbar.show({
                text:error,
                duration:Snackbar.LENGTH_SHORT
            })
            console.log("Appwrite Service :: createRecord :: error" + error);
        }
    }


}


export default AppwriteService;