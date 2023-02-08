const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../index")

chai.use(chaiHttp)
const expect = chai.expect

describe("Refresh token API", () => {
  it("Should refresh token", (done) => {
    chai.request(app)
      .post("/auth/refresh-token")
      .send({
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNSwiY3JlYXRlZEF0IjoiMjAyMy0wMi0wOFQxMzoxMzoyNC4zMjNaIiwiaWF0IjoxNjc1ODYyMDA0LCJleHAiOjE2Nzg0NTQwMDR9.Npl_HX5OALlDZHUJ1JJFHiqpCXBCfWNcuvgqFlM9bZ4"
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        done()
      })
  })

  it("Should return an error if refresh token is not found.", (done) => {
    chai.request(app)
      .post("/auth/refresh-token")
      .send({
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNSwiY3JlYXRlZIiwiaWF0IjoxNjc1ODYyMDA0LCJleHAiOjE2Nzg0NTQwMDR9.Npl_HX5OALlDZHUJ1JJFHiqpCXBCfWNcuvgqFlM9bZ4"
      })
      .end((err, res) => {
        expect(res).to.have.status(404)
        done()
      })
  })
})
