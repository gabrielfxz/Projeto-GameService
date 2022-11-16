namespace projetoFinalApi.Models
{
    public class Servico
    {
        public int Id {get;set;}
        public string name {get;set;} = string.Empty;
        public string descricao {get;set;} = string.Empty;

        public int preco {get;set;}

        public string img {get;set;} = string.Empty;
    }
}