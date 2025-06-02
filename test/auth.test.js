const chai = require('chai');
const chaiHttp = require('chai-http');
const { sequelize } = require('../models');
const app = require('../app'); // Ensure app.js exports app instance
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth API', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should register a user', done => {
    chai.request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('User created');
        done();
      });
  });

  it('should login the user and return a token', done => {
    chai.request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });

  it('should fail login with incorrect password', done => {
    chai.request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});// end