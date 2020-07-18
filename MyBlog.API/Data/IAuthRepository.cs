using System.Threading.Tasks;
using MyBlog.API.Models;

namespace MyBlog.API.Data
{
    public interface IAuthRepository
    {
        Task<User> RegisterUser(User user, string password);
        Task<User> LoginUser(string username, string password);
        Task<bool> VerifyUserExists(string username);
    }
}