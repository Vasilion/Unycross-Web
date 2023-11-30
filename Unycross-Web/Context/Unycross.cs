using Microsoft.EntityFrameworkCore;
using Unycross_Web.Models;

namespace Unycross_Web.Context
{   
   public class UnycrossContext : DbContext
    {
        public UnycrossContext(DbContextOptions<UnycrossContext> options) : base(options)
        {
        }

        public DbSet<Rider>? Riders { get; set; }
        public DbSet<Track>? Tracks { get; set; }
    }
}

