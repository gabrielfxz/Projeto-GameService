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

        [HttpGet]
        [Route("servprof")]
        [Authorize(Roles = "professor")]
        public string Professor() => "Professor";

        [HttpGet("{ServicoId}")]
        public ActionResult<List<Servico>> Get(int ServicoId)
        {
            try
            {
                var result = _context.Services.Find(ServicoId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Servico model)
        {
            try
            {
                _context.Services.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/servico/{model.Id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }
        [HttpPut("{ServicoId}")]
        public async Task<IActionResult> put(int ServicoId, Servico dadosServicoAlt)
        {
            try
            {
                //verifica se existe servico a ser alterado
                var result = await _context.Services.FindAsync(ServicoId);
                if (ServicoId != result.Id)
                {
                    return BadRequest();
                }
                result.name = dadosServicoAlt.name;
                result.Id = dadosServicoAlt.Id;
                await _context.SaveChangesAsync();
                return Created($"/api/servico/{dadosServicoAlt.Id}", dadosServicoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
        [HttpDelete("{ServicoId}")]
        public async Task<ActionResult> delete(int ServicoId)
        {
            try
            {
                //verifica se existe servico a ser excluído
                var servico = await _context.Services.FindAsync(ServicoId);
                if (servico == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(servico);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

    }
}