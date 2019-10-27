import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

const document = 'users';

const login = async function loginFn(dbAdapter, data, secret){
    try {
        const username = data.username;
        const password = data.password;

        const user = await dbAdapter.get(document, {username});

        if(user){

            const res = await compare(password, user.password);
            if (res) {

                // SIGNING OPTIONS
                const signOptions = {
                    issuer:  'E-Commerce Inc.',
                    audience: "http://e-commerce.inc",
                    subject: "anonymous",
                    algorithm: "HS256",
                    expiresIn: "1h"
                };

                const payload = {
                    username,
                    role:user.role
                }

                const token = sign(payload, secret, signOptions);
                
                return {
                    token
                };
            }            
        }
    } catch(err) {
        throw err;
    }
}

export {
    login
};
