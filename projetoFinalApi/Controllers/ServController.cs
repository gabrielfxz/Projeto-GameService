using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using projetoFinalApi.Data;
using projetoFinalApi.Models;

namespace projetoFinalApi.Controllers
{
    
    [Route("/api/servico")]
    [ApiController]
    public class ServController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SiteContext? _context;
        public ServController(
            IConfiguration configuration,
            SiteContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Servico>> GetAll()
        {
            if(_context.Services is not null) {
                return _context.Services.ToList();
            }
            else {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "falha no acesso ao banco de dados");
            }
        }

    }
}