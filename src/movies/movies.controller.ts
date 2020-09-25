import { Controller, Get, Param, Post, Delete, Patch, Body, Query} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  
  @Get()
  getAll() {
    return "This All return all movies"
  }

  @Get("search")
  search(@Query("year") searchingYear: string) {
    return `We are searching for a movie with a title: ${searchingYear}`
  }

  @Get(":id")
  getOne(@Param("id") movieId: string) {
    return `This All return one movies with the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData){
    console.log(movieData)
    return movieData;
  }

  @Delete(":id")
  remove(@Param("id") movieId:string) {
    return `This will delate a movie with the id: ${movieId}`;
  }
  
  @Patch(':id')
  path(@Param('id') movieId:string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData
    };
  }

}
