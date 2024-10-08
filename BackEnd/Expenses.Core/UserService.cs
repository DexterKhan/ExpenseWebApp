﻿using Expenses.Core.CustomExceptions;
using Expenses.Core.DTO;
using Expenses.Core.Utilities;
using Expenses.DB;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Expenses.Core
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher _passwordHasher;
        public UserService(AppDbContext context, IPasswordHasher passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<AuthenticatedUser> ExternalSignIn(User user)
        {
            var dbUser = _context.Users
                .FirstOrDefault(u => u.ExternalId.Equals(user.ExternalId) && u.ExternalType.Equals(user.ExternalType));

            if (dbUser == null)
            {
                user.Username = CreateUniqueUsernameFromEmail(user.Email);
                return await SignUp(user);
            }

            return new AuthenticatedUser()
            {
                UserName = dbUser.Username,
                Token = JwtGenerator.GenerateUserToken(dbUser.Username),
            };
        }

        public async Task<AuthenticatedUser> SignIn(User user)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
            if (dbUser == null || dbUser.Password == null || _passwordHasher.VerifyHashedPassword(dbUser.Password, user.Password) == Microsoft.AspNet.Identity.PasswordVerificationResult.Failed)
            {
                throw new InvalidUsernamePasswordException("Invalid username or password");
            }

            return new AuthenticatedUser
            {
                UserName = user.Username,
                Token = JwtGenerator.GenerateUserToken(user.Username),
            };
        }

        public async Task<AuthenticatedUser> SignUp(User user)
        {
            var checkUser = await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(user.Username));

            if (checkUser != null)
            {
                throw new UsernameAlreadyExistsException("Username already exists");
            }
            if(!string.IsNullOrEmpty(user.Password)) 
            {
                user.Password = _passwordHasher.HashPassword(user.Password);
            }

            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            return new AuthenticatedUser
            {
                UserName = user.Username,
                Token = JwtGenerator.GenerateUserToken(user.Username),
            };
        }
        private string CreateUniqueUsernameFromEmail(string email)
        {
            var emailSplit = email.Split('@').First();
            var random = new Random();
            var username = emailSplit;

            while(_context.Users.Any(u => u.Username.Equals(username)))
            {
                username = emailSplit + random.Next(1000000000);
            }
            return username;
        }
    }
}
