using Expenses.Core;
using Expenses.DB;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Expenses.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var secret = Environment.GetEnvironmentVariable("JWT_SECRET");
            var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER");

            var configuration = builder.Services.BuildServiceProvider().GetService<IConfiguration>();

            // Add services to the container.

            builder.Services.AddControllers();
            
            builder.Services.AddDbContext<AppDbContext>(options => 
            options.UseSqlServer(configuration?.GetConnectionString("DB_CONNECTION_STRING")));
            builder.Services.AddDbContext<AppDbContext>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddTransient<IExpensesServices, ExpensesServices>();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IStatisticsServices, StatisticsServices>();
            builder.Services.AddTransient<IPasswordHasher, PasswordHasher>();
            builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            
            builder.Services.AddSwaggerGen(c =>
            {
                c.CustomSchemaIds(type =>
                {
                    if (type == typeof(Expenses.Core.DTO.Expense))
                        return "CoreExpense";
                    if (type == typeof(Expenses.DB.Expense))
                        return "DbExpense";

                    return type.FullName;

                });
            });


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ExpensesPolicy",
                    builder =>
                    {
                        builder.WithOrigins("*")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret))
                };
            });

            var app = builder.Build();

            var service = (IServiceScopeFactory?)app.Services.GetService(typeof(IServiceScopeFactory));
            IServiceProvider? serviceProvider = service?.CreateScope().ServiceProvider;
            using (AppDbContext? db = serviceProvider?.GetService<AppDbContext>())
            {
                db?.Database.Migrate();
            }
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("ExpensesPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}