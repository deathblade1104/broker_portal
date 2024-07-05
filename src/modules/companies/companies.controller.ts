import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomResponseBody } from '../../common/providers/customResponse';
import { CompaniesService } from './companies.service';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll() {
    return new CustomResponseBody(
      'Fetched Companies Successfully',
      await this.companiesService.findAll(),
    );
  }
}

// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   Post,
//   Put,
//   UsePipes,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import {
//   ApiCustomResponseArray,
//   ApiCustomResponseObject,
// } from '../../common/decorators/api-response.decorator';
// import { ZodPipe } from '../../common/pipes/zod.pipe';
// import { CustomResponseBody } from '../../common/providers/customResponse';
// import {
//   CreateChecklistCategoriesArrayDto,
//   UpdateChecklistCategoryDto,
// } from './checklist_categories.dto';
// import { IChecklistCategories } from './checklist_categories.interface';
// import { ChecklistCategoriesService } from './checklist_categories.service';
// import { CreateChecklistCategoriesSchemaArray } from './checklist_categories.zod.schema';

// @ApiTags('checklist-categories')
// @Controller('checklist-categories')
// export class ChecklistCategoriesController {
//   constructor(
//     private readonly checklistCategoriesService: ChecklistCategoriesService,
//   ) {}

//   @Post()
//   @ApiCustomResponseArray(IChecklistCategories)
//   @UsePipes(new ZodPipe(CreateChecklistCategoriesSchemaArray))
//   async create(
//     @Body() createChecklistCategoryDto: CreateChecklistCategoriesArrayDto,
//   ) {
//     const res = await this.checklistCategoriesService.createCategoriesInBulk(
//       createChecklistCategoryDto,
//     );
//     return new CustomResponseBody(
//       'New Checklist-Categorie(s) Created Successfully.',
//       res,
//     );
//   }

//   @Get()
//   @ApiCustomResponseArray(IChecklistCategories)
//   async findAll() {
//     return new CustomResponseBody(
//       'Fetched Checklist-Categories Successfully.',
//       await this.checklistCategoriesService.findAll(),
//     );
//   }

//   @Get(':id')
//   @ApiCustomResponseObject(IChecklistCategories)
//   async findOne(@Param('id') id: string) {
//     const res: IChecklistCategories =
//       await this.checklistCategoriesService.findById(+id);
//     return new CustomResponseBody(
//       'Fetched Checklist-Category Successfully.',
//       res,
//     );
//   }

//   @Put(':id')
//   @ApiCustomResponseObject(IChecklistCategories)
//   async update(
//     @Param('id') id: string,
//     @Body() updateChecklistCategoryDto: UpdateChecklistCategoryDto,
//   ) {
//     const res: IChecklistCategories =
//       await this.checklistCategoriesService.updateChecklistCategoryById(
//         +id,
//         updateChecklistCategoryDto,
//       );
//     return new CustomResponseBody(
//       'Updated Checklist-Category Successfully.',
//       res,
//     );
//   }
// }
