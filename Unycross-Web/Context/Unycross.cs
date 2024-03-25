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
        public DbSet<User>? Users { get; set; }
        public DbSet<UserTrackFeedBack>? UsersTrackFeedBack { get; set; }
        public DbSet<FavoriteTrack>? FavoriteTrack { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FavoriteTrack>()
                .HasKey(ft => new { ft.UserId, ft.TrackId });

            modelBuilder.Entity<FavoriteTrack>()
                .HasOne(ft => ft.User)
                .WithMany(u => u.FavoriteTracks)
                .HasForeignKey(ft => ft.UserId);

            modelBuilder.Entity<FavoriteTrack>()
                .HasOne(ft => ft.Track)
                .WithMany()
                .HasForeignKey(ft => ft.TrackId);
        }
    }
}

