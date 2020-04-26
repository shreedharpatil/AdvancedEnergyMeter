using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SPS.AEM.Database.Contexts;
using SPS.AEM.Database.Entities;
using SPS.AEM.Repository.Interfaces;
using SPS.AEM.Repository.Models;

namespace SPS.AEM.Repository.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly AemDatabaseContext context;

        public UserRepository(AemDatabaseContext context)
        {
            this.context = context;
        }

        public async Task AddUserAsync(UserDto user)
        {
            var userToCreated = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                RoleId = user.RoleId > 0 ? user.RoleId : 1
            };

            this.context.Users.Add(userToCreated);
            await this.context.SaveChangesAsync();

            var login = new Login
            {
                Username = user.Username,
                Password = user.Password,
                UserId = userToCreated.Id
            };

            context.Logins.Add(login);
            await this.context.SaveChangesAsync();

            user.Id = userToCreated.Id;
        }
    }
}
