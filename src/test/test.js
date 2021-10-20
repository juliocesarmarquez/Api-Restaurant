const { expect } = require('chai');
const request = require('supertest');
const { main } = require('../../src/index');

describe('API Sign up test', () => {
  // Tests
  it('The api must create a user.', (done) => {
    const nuevoUsuario = { nombreUsuario: 'test', nombreApellido: 'test',  direccion: 'test 123', email: 'test@gmail.com', telefono: 123, contrasena: 'test' }
    const server = main();
    request(server)
      .post('/api/usuariotest')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(nuevoUsuario)
      .expect(201)
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          expect(res.body).not.to.be.empty;
          expect(res.body).to.be.a('string', 'Now you can log in.')
          done();
        }
      });
  });

  it('should not create user if email is already in use', (done) => {
    const nuevoUsuario1 = { nombreUsuario: 'test', nombreApellido: 'test',  direccion: 'test 123', email: 'test@gmail.com', telefono: 123, contrasena: 'test' }
    const server = main();
    request(server)
      .post('/api/usuariotest')
      .send(nuevoUsuario1)
      .expect(417)
      .end(done);
  });
});