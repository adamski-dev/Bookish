using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services
{
    public class CacheService : ICacheService
    {
        private readonly IDatabase _database;
        public CacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }
        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if(response == null)
            {
                return;
            } 

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serlializedResponse = JsonSerializer.Serialize(response, options);
            await _database.StringSetAsync(cacheKey, serlializedResponse, timeToLive);
        }

        public async Task<string> GetCachedResponseAsync(string cacheKey)
        {
            var cachedRespone = await _database.StringGetAsync(cacheKey);

            if(cachedRespone.IsNullOrEmpty)
            {
                return null;
            }

            return cachedRespone;
        }
    }
}