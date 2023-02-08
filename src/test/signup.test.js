const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../index")

chai.use(chaiHttp)
const expect = chai.expect

describe("Signup API", () => {
  it("Should sign up a new user", (done) => {
    chai.request(app)
      .post("/auth/sign-up")
      .send({
        email: "giangvo02078@gmail.com",
        password: "12345678",
        firstName: "Võ",
        lastName: "Giang"
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        done()
      })
  })

  it("Should return an error if email is already exist", (done) => {
    chai.request(app)
      .post("/auth/sign-up")
      .send({
        email: "giangvo02075@gmail.com",
        password: "12345678",
        firstName: "Võ",
        lastName: "Giang"
      })
      .end((err, res) => {
        expect(res).to.have.status(500)
        if (res.body.error) {
          expect(res.body).to.have.property("error").to.equal("Email already exist!")
        }
        done()
      })
  })

  it("Should return an error if not correct email format.", (done) => {
    chai.request(app)
      .post("/auth/sign-up")
      .send({
        email: "giangvo02075gmail.com",
        password: "12345678",
        firstName: "Võ",
        lastName: "Giang"
      })
      .end((err, res) => {
        expect(res).to.have.status(400)
        done()
      })
  })

  it("Should return an error if the password is not correct fotmat.", (done) => {
    chai.request(app)
      .post("/auth/sign-up")
      .send({
        email: "giangvo02072331235gmail.com",
        password: "15678",
        firstName: "Võ",
        lastName: "Giang"
      })
      .end((err, res) => {
        expect(res).to.have.status(400)
        done()
      })
  })
})
