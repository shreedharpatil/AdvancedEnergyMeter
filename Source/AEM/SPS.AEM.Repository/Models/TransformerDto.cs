using System.ComponentModel.DataAnnotations;

namespace SPS.AEM.Repository.Models
{
    public class TransformerDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int FeederId { get; set; }
    }
}
