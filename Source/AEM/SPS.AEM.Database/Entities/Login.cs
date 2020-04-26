namespace SPS.AEM.Database.Entities
{
    public class Login
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
