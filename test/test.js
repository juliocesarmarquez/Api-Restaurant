const { expect } = require('chai');
const request = require('supertest');
const { makeServer } = require('../src/server');

describe('API Sign up test', () => {
  
  it('The api must create a user.', (done) => {
    const nuevoUsuario = { nombreUsuario: 'perro', apellido: 'bot', email: 'test@test.com', direccion: 'calle del test 528', telefono: 15885654, contrasena: 'testeando' }
    const server = makeServer();
    request(server)
      .post('/api/testusuario')
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
    const nuevoUsuario1 = { nombreUsuario: 'perro', apellido: 'bot', email: 'person2@gmail.com', direccion: 'calle del test 528', telefono: 15885654, contrasena: 'testeando' }
    const server = makeServer();
    request(server)
      .post('/api/testusuario')
      .send(nuevoUsuario1)
      .expect(417)
      .end(done);
  });
});