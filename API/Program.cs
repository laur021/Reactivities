using Application.Activities.Queries;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

//Scan the assembly (DLL) where GetActivityList.Handler is defined, and automatically register all request and notification handlers inside it.
builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.MapControllers();


/*Now, what this means is that when this method, when this function goes outside of scope, as in we then run our application. Anything that we use inside here is going to be disposed of by the framework. And it's not something that we need to clean up after ourselves because we're using this using keyword.
*/
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    /*
        This asynchronously applies any pending migrations for the context to the database. And it will create the create the database if it does not already exist. So when we effectively start our application, then this command is going to be called. Any pending migrations will be applied. And if the database hasn't been created yet it's going to create that for us. And then we'll see our data in.
    */
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration.");
}

app.Run();
