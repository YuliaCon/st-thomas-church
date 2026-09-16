using OrchardCore.Users.Services;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddCors(options => {
    options.AddPolicy("AllowNextJS", p => p
        .WithOrigins("http://localhost:3000") // Your Next.js port
        .AllowAnyMethod()
        .AllowAnyHeader());
});

builder.Services.AddOrchardCms()
    .AddSetupFeatures(
        "OrchardCore.Features",  // Re-enables the Configuration -> Modules menu
        "OrchardCore.Users",     // Re-enables the Users menu
        "OrchardCore.Roles",     // Re-enables the Security -> Roles menu
        "OrchardCore.GraphQL"    // Explicitly activates the GraphQL API
    );

var app = builder.Build();

app.UseCors("AllowNextJS");
app.UseStaticFiles();
app.UseOrchardCore();

app.Run();
