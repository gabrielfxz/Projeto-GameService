using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjetoEscola_API.Models;
using System.Diagnostics.CodeAnalysis;

namespace ProjetoEscola_API.Data
{
    public class SiteContext: DbContext
    {
        public SiteContext(DbContextOptions<SiteContext> options): base (options)
        {

        }
          
        public DbSet<User> Usuario {get;set;}
    }
}