import Realm from "realm";
import { BSON } from "bson";
class UserSchema extends Realm.Object {}

UserSchema.schema = {
    name: "User",
    properties:{
        _id: { type: 'objectId', default: () => new BSON.ObjectId() },
        name:{type:'string',indexed:'full-text'},
        phone:{type:'string',indexed:'full-text'},
        habits:{type:'list',objectType:'string'},

    },
    primaryKey:'_id'
};

let realm = new Realm({schema:[UserSchema],schemaVersion:1});


// let addUser = (name,phone,habits) => {
//     realm.write(() => {
//         const user  = realm.create('User',
//             {   
//                 _id: new BSON.ObjectId(),
//                 name:name,
//                 phone:phone,
//                 habits:habits});
//     });
//     console.log('User added');
// }

// addUser('John','123456789',['Reading','Running']);


let getAllUsers = () => {
    return realm.objects('User');
}

console.log(getAllUsers());


export default realm;