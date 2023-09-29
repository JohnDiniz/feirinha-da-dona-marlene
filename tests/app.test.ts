import request from 'supertest';
import app from '../src/app'; // Importe a instância do Express
import httpStatus from 'http-status';

describe('Fruits API', () => {
  it('should return 201 when inserting a fruit', async () => {
    const response = await request(app)
      .post('/fruits')
      .send({ name: 'Apple', color: 'Red' });

    expect(response.status).toBe(httpStatus.CREATED);
  });

  it('should return 409 when inserting a fruit that is already registered', async () => {
    // Insira código aqui para inserir uma fruta com o mesmo nome
    const response = await request(app)
      .post('/fruits')
      .send({ name: 'Apple', color: 'Green' });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it('should return 422 when inserting a fruit with data missing', async () => {
    const response = await request(app)
      .post('/fruits')
      .send({ color: 'Red' });

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY); // 422
  });

  it('should return 404 when trying to get a fruit by an id that doesn\'t exist', async () => {
    const response = await request(app).get('/fruits/999'); // ID inexistente

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should return 400 when id param is present but not valid', async () => {
    const response = await request(app).get('/fruits/invalid-id');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return one fruit when given a valid and existing id', async () => {
    // Insira código aqui para criar uma fruta e obter o ID dela
    const response = await request(app).get(`/fruits/${validId}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveProperty('name', 'Apple'); // Substitua por propriedades reais da fruta
  });

  it('should return all fruits if no id is present', async () => {
    const response = await request(app).get('/fruits');

    expect(response.status).toBe(httpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
