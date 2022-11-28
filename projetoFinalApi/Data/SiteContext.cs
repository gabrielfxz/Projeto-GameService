using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using projetoFinalApi.Models;
using System.Diagnostics.CodeAnalysis;

namespace projetoFinalApi.Data
{
    public class SiteContext: DbContext
    {
        public SiteContext(DbContextOptions<SiteContext> options): base (options)
        {

        }
          
        public DbSet<User> Usuario {get;set;}

        public DbSet<Servico> Services {get;set;}

        public DbSet<Compra> Compras {get;set;}
    }
}