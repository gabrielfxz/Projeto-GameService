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
    
    [Route("/api/compra")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SiteContext? _context;
        public CompraController(
            IConfiguration configuration,
            SiteContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Compra>> GetAll()
        {
            if(_context.Compras is not null) {
                return _context.Compras.ToList();
            }
            else {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "falha no acesso ao banco de dados");
            }
        }

        [HttpGet("{CompraId}")]
        public ActionResult<List<Compra>> Get(int CompraId)
        {
            try
            {
                var result = _context.Compras.Find(CompraId);
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
        public async Task<ActionResult> post(Compra model)
        {
            try
            {
                _context.Compras.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/compra/{model.id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }
        [HttpPut("{CompraId}")]
        public async Task<IActionResult> put(int CompraId, Compra dadosCompraAlt)
        {
            try
            {
                //verifica se existe compra a ser alterada
                var result = await _context.Compras.FindAsync(CompraId);
                if (CompraId != result.id)
                {
                    return BadRequest();
                }
                result.id = dadosCompraAlt.id;
                await _context.SaveChangesAsync();
                return Created($"/api/compra/{dadosCompraAlt.id}", dadosCompraAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
        [HttpDelete("{CompraId}")]
        public async Task<ActionResult> delete(int CompraId)
        {
            try
            {
                //verifica se existe compra a ser excluída
                var compra = await _context.Compras.FindAsync(CompraId);
                if (compra == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(compra);
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