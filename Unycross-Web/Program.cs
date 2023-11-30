using Microsoft.EntityFrameworkCore;
using Unycross_Web.Models;
using Unycross_Web.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<UnycrossContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("UnycrossDb")));
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var unycrossContext = scope.ServiceProvider.GetRequiredService<UnycrossContext>();
        //unycrossContext.Database.EnsureCreated();
        unycrossContext.Database.Migrate();  //THIS RUNS PENDING MIGRATIONS
    }
    app.UseSwagger();
    app.UseSwaggerUI(options =>
{
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        //options.RoutePrefix = string.Empty;
    });
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
