﻿using System;
using System.Collections.Generic;
using System.Text;

namespace SPS.AEM.Repository.Models
{
    public class UserDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int RoleId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
    }
}