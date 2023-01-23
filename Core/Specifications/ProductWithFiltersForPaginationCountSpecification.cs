using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForPaginationCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForPaginationCountSpecification(ProductSpecParams productParams)
            : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Title.ToLower().Contains(productParams.Search)) &&
                (!productParams.CategoryId.HasValue || x.ProductCategoryId == productParams.CategoryId) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {
        }
    }
}