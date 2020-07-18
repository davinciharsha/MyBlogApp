using System.ComponentModel.DataAnnotations;

namespace MyBlog.API.DTO
{
    public class RegisterUserDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [Range(4,9, ErrorMessage="Password length must be between 4 and 9 characters")]
        public string Password { get; set; }
    }
}