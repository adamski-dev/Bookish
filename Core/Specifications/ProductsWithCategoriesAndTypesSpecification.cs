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
        public ProductsWithCategoriesAndTypesSpecification()
        {
            AddInclude(x => x.ProductCategory);
            AddInclude(x => x.ProductType);
        }

        public ProductsWithCategoriesAndTypesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductCategory);
            AddInclude(x => x.ProductType);
        }
    }
}