using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyBlog.API.Data;
using MyBlog.API.DTO;
using MyBlog.API.Models;

namespace MyBlog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _repo = repo;
            _mapper = mapper;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDTO registerUserDto)
        {
            registerUserDto.UserName = registerUserDto.UserName.ToLower();
            if (await _repo.VerifyUserExists(registerUserDto.UserName))
            {
                return BadRequest("User exists");
            }
            else
            {
                var userToCreate = _mapper.Map<User>(registerUserDto);
                var createdUser = await _repo.RegisterUser(userToCreate, registerUserDto.Password);
                var userToReturn = _mapper.Map<UserForDetailDTO>(createdUser);
                return CreatedAtRoute("GetUser", new { Controller = "Users", createdUser.Id }, userToReturn);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDTO loginUserDto)
        {
            var currentUser = await _repo.LoginUser(loginUserDto.UserName.ToLower(), loginUserDto.Password);
            if (currentUser == null)
            {
                return Unauthorized();
            }
            else
            {
                var claims = new[]
                {
                new Claim(ClaimTypes.NameIdentifier, currentUser.Id.ToString()),
                new Claim(ClaimTypes.Name, currentUser.UserName)
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = creds
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var user = _mapper.Map<UserForListDTO>(currentUser);

                return Ok(new
                {
                    token = tokenHandler.WriteToken(token),
                    user
                });
            }
        }
    }
}