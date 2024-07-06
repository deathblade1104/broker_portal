import {
  FilterOperator,
  PaginateConfig,
  PaginationType,
} from 'nestjs-paginate';
import { BrokerReferredLead } from './entities/broker_referred_lead.entity';

export const brokerReferredLeadConfig: PaginateConfig<BrokerReferredLead> = {
  /**
   * Required: true (must have a minimum of one column)
   * Type: (keyof ChecklistEntity)[]
   * Description: These are the columns that are valid to be sorted by.
   */
  sortableColumns: ['id', 'updated_at'],

  /**
   * Required: false
   * Type: 'first' | 'last'
   * Description: Define whether to put null values at the beginning
   * or end of the result set.
   */
  nullSort: 'last',

  /**
   * Required: false
   * Type: [keyof ChecklistEntity, 'ASC' | 'DESC'][]
   * Default: [[sortableColumns[0], 'ASC]]
   * Description: The order to display the sorted entities.
   */
  defaultSortBy: [
    ['updated_at', 'DESC'],
    ['id', 'DESC'],
  ],

  /**
   * Required: false
   * Type: (keyof ChecklistEntity)[]
   * Description: These columns will be searched through when using the search query
   * param. Limit search scope further by using `searchBy` query param.
   */
  searchableColumns: [
    'id',
    'broker.email',
    'broker.name',
    'broker.phone_number',
    'client_name',
  ],

  /**
   * Required: false
   * Type: (keyof ChecklistEntity)[]
   * Default: None
   * Description: TypeORM partial selection. Limit selection further by using `select` query param.
   * https://typeorm.io/select-query-builder#partial-selection
   * Note: You must include the primary key in the selection.
   */
  //select: ['id', 'name', 'color'],

  /**
   * Required: false
   * Type: number
   * Default: 100
   * Description: The maximum amount of entities to return per page.
   * Set it to 0, in conjunction with limit=0 on query param, to disable pagination.
   */
  //maxLimit: 20,

  /**
   * Required: false
   * Type: number
   * Default: 20
   */
  defaultLimit: 50,

  /**
   * Required: false
   * Type: TypeORM find options
   * Default: None
   * https://typeorm.io/#/find-optionsfind-options.md
   */
  // where: {  },

  /**
   * Required: false
   * Type: { [key in ChecklistEntity]?: FilterOperator[] } - Operators based on TypeORM find operators
   * Default: None
   * https://typeorm.io/#/find-options/advanced-options
   */
  filterableColumns: {
    status: [FilterOperator.EQ],
    broker_id: [FilterOperator.EQ],
    created_at: [FilterOperator.BTW, FilterOperator.GTE, FilterOperator.LTE],
    updated_at: [FilterOperator.BTW, FilterOperator.GTE, FilterOperator.LTE],
  },

  /**
   * Required: false
   * Type: RelationColumn<ChecklistEntity>
   * Description: Indicates what relations of entity should be loaded.
   */
  relations: ['broker'],

  // /**
  //  * Required: false
  //  * Type: boolean
  //  * Default: false
  //  * Description: Load eager relations using TypeORM's eager property.
  //  * Only works if `relations` is not defined.
  //  */
  // loadEagerRelations: true,

  /**
   * Required: false
   * Type: boolean
   * Description: Disables the global condition of "non-deleted" for the entity with delete date columns.
   * https://typeorm.io/select-query-builder#querying-deleted-rows
   */
  //withDeleted: false,

  /**
   * Required: false
   * Type: string
   * Description: Allow user to choose between limit/offset and take/skip.
   * Default: PaginationType.TAKE_AND_SKIP
   *
   * However, using limit/offset can cause problems with relations.
   */
  paginationType: PaginationType.TAKE_AND_SKIP,

  /**
   * Required: false
   * Type: boolean
   * Default: false
   * Description: Generate relative paths in the resource links.
   */
  relativePath: true,

  /**
   * Required: false
   * Type: string
   * Description: Overrides the origin of absolute resource links if set.
   */
  //origin: 'http://cats.example',

  /**
   * Required: false
   * Type: boolean
   * Default: false
   * Description: Prevent `searchBy` query param from limiting search scope further. Search will depend upon `searchableColumns` config option only
   */
  ignoreSearchByInQueryParam: true,

  /**
   * Required: false
   * Type: boolean
   * Default: false
   * Description: Prevent `select` query param from limiting selection further. Partial selection will depend upon `select` config option only
   */
  ignoreSelectInQueryParam: true,
};
