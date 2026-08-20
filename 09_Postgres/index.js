require("dotenv").config();
const db = require("./db");
const {userTable} = require("./drizzle/schema");


async function getAllUsers() {
    const users = await db.select().from(userTable);
    console.log(`Users in DB`, users);
    return users;
}


// getAllUsers();

/* CREATE USER
async function createUser( {id, name, email}){
    await db.insert(userTable).values({
        id,
        name,
        email,
    });
};

createUser({id: 1, name: 'Mahboob', email: 'mahboob9184@gmail.com'});
createUser({id: 2, name: "thomas shelby", email: 'thomas@gmail.com'});
createUser({id: 3, name: "marcos", email: 'marcos@gmail.com'});
*/

getAllUsers();



// // DELETE A USER BY ID
// async function deleteUsers() {

// }

