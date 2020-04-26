namespace SPS.AEM.Database.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int RoleId { get; set; }

        public virtual Role Role { get; set; }
    }
}
