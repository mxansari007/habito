import { ID,Account, Client } from 'appwrite'
import Config from 'react-native-config'

import Snackbar from 'react-native-snackbar'
import { App, User } from 'realm';

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
        console.log(phone)
        try {
            const userAccount = await this.account.createPhoneToken(
                ID.unique(),
                '+919457077164',
            )

        
            if(userAccount){
                Snackbar.show({
                    text:'Account Created Successfully',
                    duration:Snackbar.LENGTH_SHORT
                })
                return userAccount;
            }else{
                Snackbar.show({
                    text:'Failed to create account',
                    duration:Snackbar.LENGTH_SHORT
                })
                return null;
            }

        } catch (error) {
            Snackbar.show({
                text:error,
                duration:Snackbar.LENGTH_SHORT
            })
            console.log("Appwrite Service :: createRecord :: error" + error);
            return null;
        }
    }


    async verifyOTP({UserAccount,otp}:any){
        try {
            const userAccount = await this.account.createSession(
                UserAccount.userId,
                otp,
            )
            if(userAccount){
                Snackbar.show({
                    text:'OTP Verified Successfully',
                    duration:Snackbar.LENGTH_SHORT
                })
                const token = await this.account.createJWT();
                return token;
            }else{
                Snackbar.show({
                    text:'Failed to verify OTP',
                    duration:Snackbar.LENGTH_SHORT
                })
                return null;    
            }

        } catch (error) {
            Snackbar.show({
                text:error,
                duration:Snackbar.LENGTH_SHORT
            })
            console.log("Appwrite Service :: verifyOTP :: error" + error);
            return null;    
        }
    }



}


export default AppwriteService;