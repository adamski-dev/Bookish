using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(a => a.ProductCategory, o => o.MapFrom(s => s.ProductCategory.Name))
                .ForMember(a => a.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(a => a.PictureUrl, o => o.MapFrom<ProductUrlResolver>());
            
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(a => a.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(a => a.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(a => a.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(a => a.ProductTitle, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(a => a.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                .ForMember(a => a.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}