using System.Collections.Generic;
using System.Threading.Tasks;
using MyBlog.API.Models;

namespace MyBlog.API.Data
{
    public interface IBlogRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T>(T entity) where T: class;

         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetUsers();

         Task<User> GetUser(int id);
         
    }
}