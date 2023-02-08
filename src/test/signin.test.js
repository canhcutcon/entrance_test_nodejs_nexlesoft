const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Signin API', () => {
    it('Should sign in a user', (done) => {
        chai.request(app)
            .post('/auth/sign-in')
            .send({
                email: "giangvo02078@gmail.com",
                password: "12345678"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return an error if not correct email format.', (done) => {
        chai.request(app)
            .post('/auth/sign-in')
            .send({
                email: "giangvo02075gmail.com",
                password: "12345678"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('Should return an error if the password is not correct fotmat.', (done) => {
        chai.request(app)
            .post('/auth/sign-in')
            .send({
                email: "giangvo02075gmail.com",
                password: "15678",
                firstName: "Võ",
                lastName: "Giang"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
});
