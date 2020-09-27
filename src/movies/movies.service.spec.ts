import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2020
    });

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2+3).toEqual(5);
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe("getOne", () => {

    it("should return a movie", () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 404 error", () => {
      const ID = 999;
      try {
        service.getOne(ID);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${ID} not found `);
      }
    });
    
  });

  describe("deleteOne", () => {

    it('deletes a movie', () => {
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const atferDelete = service.getAll().length;
  
      expect(atferDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', () => {
      const ID = 999;
      try {
        service.deleteOne(ID);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${ID} not found `);
      }
    });

  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const UPDATED_TEST = 'Updated Test'
      service.update(1, {title: UPDATED_TEST});
      const movie = service.getOne(1);
      expect(movie.title).toEqual(UPDATED_TEST);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });

});
