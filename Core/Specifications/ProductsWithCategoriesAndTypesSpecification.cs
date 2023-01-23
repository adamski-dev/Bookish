using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithCategoriesAndTypesSpecification : BaseSpecification<Product>
    {
        public ProductsWithCategoriesAndTypesSpecification(ProductSpecParams productParams)
            : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Title.ToLower().Contains(productParams.Search)) &&
                (!productParams.CategoryId.HasValue || x.ProductCategoryId == productParams.CategoryId) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {
            AddInclude(x => x.ProductCategory);
            AddInclude(x => x.ProductType);
            AddOrderBy(x => x.Title);
            ApplyPaging(productParams.PageSize, productParams.PageSize * (productParams.PageIndex - 1));

            if(!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc": AddOrderBy(p => p.Price); break;

                    case "priceDesc": AddOrderByDescending(p => p.Price); break;

                    case "author": AddOrderBy(p => p.Author); break;

                    default: AddOrderBy(p => p.Title); break;
                }
            }
        }

        public ProductsWithCategoriesAndTypesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductCategory);
            AddInclude(x => x.ProductType);
        }
    }
}