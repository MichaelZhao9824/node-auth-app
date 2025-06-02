const chai = require('chai');
const chaiHttp = require('chai-http');
const { sequelize } = require('../models');
const app = require('../app'); // Ensure app.js exports app instance
const expect = chai.expect;

chai.use(chaiHttp);

describe('Tasks API', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a task after authentication', done => {
    chai.request(app)
      .post('/auth/register')
      .send({ username: 'taskuser', password: 'pass123' })
      .end((err, res) => {
        chai.request(app)
          .post('/auth/login')
          .send({ username: 'taskuser', password: 'pass123' })
          .end((err, res) => {
            const token = res.body.token;
            chai.request(app)
              .post('/tasks')
              .set('Authorization', `Bearer ${token}`)
              .send({ title: 'Test Task', description: 'Task desc' })
              .end((err, res) => {
                expect(res).to.have.status(201);
                done();
              });
          });
      });
  });
});