using System.ComponentModel.DataAnnotations;

namespace MyBlog.API.DTO
{
    public class RegisterUserDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}