
import type { Request, Response } from 'express';

// Mock de req y res de Express
const req = { params: { id: '1' } } as unknown as Request;
// esto es para que ts no tire error porque están incompletos el req y el res entonces
// le decimos que sean de tipo desconocido pero los trate como Request y Response (tipos de Express)
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;


// Instancia global de em para compartir entre el mock y el test
// esto es una constante que luego se le asigna a la property del em de abajo
const em = {
  findOneOrFail: jest.fn(),
  create: jest.fn(),
  flush: jest.fn(),
  assign: jest.fn(),
  getReference: jest.fn(),
  removeAndFlush: jest.fn(),
};

// Mock de la clase ORM para que siempre devuelva la misma instancia de em
jest.mock('../src/orm', () => {
  return {
    ORM: class {
      em = em;
    }
  };
});

// Importa después de mockear
import { findOne } from '../src/juego.controller';
import { Juego } from '../src/juego.entity';

// em ya está definido arriba y es compartido con el controller

describe('findOne (mockeado)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devuelve 200 si encuentra el juego', async () => {
    em.findOneOrFail.mockResolvedValueOnce(new Juego({ id: 1, nombre: 'Zelda' }));
    await findOne(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'found game' }));
  });

  it('devuelve 500 si no lo encuentra', async () => {
    em.findOneOrFail.mockRejectedValueOnce(new Error('No encontrado'));
    await findOne(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'No encontrado' }));
    //esta última línea dice que se llamó a la función json con un objeto que contiene el mensaje 'No encontrado'
  });
});
