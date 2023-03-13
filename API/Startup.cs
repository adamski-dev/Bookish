using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using API.Helpers;
using API.Middleware;
using API.Extensions;
using StackExchange.Redis;
using Microsoft.Extensions.FileProviders;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfiles));

            services.AddControllers();

            services.AddDbContext<StoreContext>(x => x.UseSqlite(_configuration.GetConnectionString("DefaultConnection")));

            services.AddSingleton<IConnectionMultiplexer>(c => {
                var options = ConfigurationOptions.Parse(_configuration.GetConnectionString("Redis"));
                return ConnectionMultiplexer.Connect(options);
            });

            services.AddApplicationServices();

            services.AddIdentityServices(_configuration);
            //removed the below into extensions
            /* services.AddDbContext<AppIdentityDbContext>(x => 
            {
                x.UseSqlite(_configuration.GetConnectionString("IdentityConnection"));
            }); */
            
            services.AddSwaggerDocumentation();
            services.AddCors(options => 
                {
                    options.AddPolicy("CorsPolicy", policy => 
                    {
                        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                    });
                }
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),
                 "Content")), RequestPath = "/Content"
            });
            
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            
            app.UseAuthorization();

            app.UseSwaggerDocumentation();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
