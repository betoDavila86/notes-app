import { call } from '../utils'
import { validateCallback } from './helpers/validations'

export default function (token, callback) {

    if (typeof token !== 'string') throw new TypeError(`${token} is not a token`)

    validateCallback(callback)

    call('GET', 'http://localhost:4000/api/users', { Authorization: `Bearer ${token}` }, 
    '', (status, response) => {

        if( status === 0 )
            return callback(new Error('server error'))
            
            else if (status !== 200) {
                const { error } = JSON.parse(response)

                return callback(new Error(error))
            }
            const user = JSON.parse(response)

            callback(null, user)
        })
}