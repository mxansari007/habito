import { ID,Account, Databases,Client, Query } from 'appwrite'
import Config from 'react-native-config'

import Snackbar from 'react-native-snackbar'
import { App, User } from 'realm';

const appwWriteClient = new Client();

const APPWRITE_ENDPOINT:string = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID:string = '668638890017c55c3935';

type Habit = {
    userId:string,
    name:string,
    isCompleted:boolean,
}

class AppwriteService {
    account;
    database;

    constructor() {
        appwWriteClient
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwWriteClient)
        this.database = new Databases(appwWriteClient)
    }


    //create a new record

    async createRecord({phone}:{phone:string}){
        try {
            const userAccount = await this.account.createPhoneToken(
                ID.unique(),
                phone,
            );

        
            if(userAccount){
                Snackbar.show({
                    text:'OTP Sent Successfully',
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

    


    async verifyOTP({UserAccount,otp,name,phone}:any){
        try {
            const userAccount = await this.account.createSession(
                UserAccount.userId,
                otp,
            )

            
            if(userAccount){
                const user = await this.database.createDocument(
                    '6689077d00108f73b7d8',
                    '668907bd001b4b65ce5e',
                    userAccount.userId,
                    {
                        name:name,
                        phone:phone,
                    }
                );
                console.log(user);

                Snackbar.show({
                    text:'Account Created Successfully',
                    duration:Snackbar.LENGTH_SHORT
                })
                return user;
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

    async createMySession ({otp,userId}:{otp:string,userId:string}) {
        console.log(userId)

        try{

            const userAccount = await this.account.createSession(
                userId,
                otp
            )

            if(userAccount){
                Snackbar.show({
                    text:'Login Successful',
                    duration:Snackbar.LENGTH_SHORT
                })
                return userAccount;
            }else{
                Snackbar.show({
                    text:'Failed to create session',
                    duration:Snackbar.LENGTH_SHORT
                })
                return null;
            }

        }catch(error){

            console.log("Appwrite Service :: createMySession :: error" + error);
            return null;

        }
    }

    async checkUser (phone:string) {

        try{
            
            const user = await this.database.listDocuments(
                '6689077d00108f73b7d8',
                '668907bd001b4b65ce5e',
                [
                    Query.equal('phone',[phone])
                ])

            return user;
        }
        catch(error){
                
                console.log("Appwrite Service :: checkUser :: error" + error);
                return null;
    
            }
    }

    async deleteSession () {

        try{
            const res = await this.account.deleteSession('current')
            return res;
        }catch(error){
                
                console.log("Appwrite Service :: deleteSession :: error" + error);
                return null;
    
            }

    }




    async createHabit (habit: Habit,userId:string) {

        try{

            const habitRecord = await this.database.createDocument(
                '6689077d00108f73b7d8',
                '668921ff0032ae97ac11',
                userId,
                {
                    name:habit.name,
                    isCompleted:habit.isCompleted
                }
            )

            if(habitRecord){
                Snackbar.show({
                    text:'Habit Created Successfully',
                    duration:Snackbar.LENGTH_SHORT
                })
                return habitRecord;
            }


        }catch(error){

            console.log("Appwrite Service :: createHabit :: error" + error);
            return null;

        }
    }


}


export default AppwriteService;