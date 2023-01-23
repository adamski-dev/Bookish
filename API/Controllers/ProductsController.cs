using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Controllers
{
    
    public class ProductsController : BaseApiController
    {
        
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IGenericRepository<ProductCategory> _productCategoryRepository;
        private readonly IGenericRepository<ProductType> _productTypeRepository;
        private readonly IMapper _mapper;
        
        public ProductsController(IGenericRepository<Product> productRepository,
            IGenericRepository<ProductCategory> productCategoryRepository,
            IGenericRepository<ProductType> productTypeRepository,
            IMapper mapper)
        {
            _productRepository = productRepository;
            _productTypeRepository = productTypeRepository;
            _productCategoryRepository = productCategoryRepository;
            _mapper = mapper;
            
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
            [FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithCategoriesAndTypesSpecification(productParams);
            var countSpec = new ProductWithFiltersForPaginationCountSpecification(productParams);
            var itemsCount = await _productRepository.CountAsync(countSpec);
            var products = await _productRepository.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize,
                itemsCount, data));

        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithCategoriesAndTypesSpecification(id);
            var product = await _productRepository.GetEntitiesWithSpec(spec);

            if(product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<ProductCategory>> GetProductCategories()
        {
            return Ok(await _productCategoryRepository.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<ProductType>> GetProductTypes()
        {
            return Ok(await _productTypeRepository.ListAllAsync());
        }
    }
}