using System.Collections.Generic;
using System.Threading.Tasks;
using MyBlog.API.Models;
using MyBlog.API.Helpers;

namespace MyBlog.API.Data
{
    public interface IBlogRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetUserMainPhoto(int id);
        Task<Like> GetLike(int userId, int recepientId);
    }
}