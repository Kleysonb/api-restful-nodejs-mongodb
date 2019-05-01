import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address;

test('get /reviews', () => {
    return request(address)
        .get('/reviews')
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        }).catch(fail)
});

// test('post /reviews', () => {
//     return request(address)
//         .post('/reviews')
//         .send({
//             date: "2019-04-28",
//             rating: 3,
//             comments: "Delicioso",
//             restaurant: "5cc60306f43f4b1fae472c0a",
//             user: "5cbbcc16172ca83b110a5653"
//         }).then(response => {
//             expect(response.status).toBe(200)
//             expect(response.body._id).toBeDefined()
//             expect(response.body.name).toBe('usuario1')
//             expect(response.body.email).toBe('usuario1@gmail.com')
//             expect(response.body.cpf).toBe('962.116.531-82')
//             expect(response.body.password).toBeUndefined()
//         }).catch(fail)
// });

test('get /reviews/aaaa', () => {
    return request(address)
        .get('/reviews/aaaa')
        .then(response => {
            expect(response.status).toBe(404)
        }).catch(fail)
});

