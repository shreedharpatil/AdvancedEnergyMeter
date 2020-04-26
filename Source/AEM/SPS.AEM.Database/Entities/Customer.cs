namespace SPS.AEM.Database.Entities
{
    public class Customer
    {
        public int Id { get; set; }

        public string RRNumber { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int LoadTypeId { get; set; }

        public int TransformerId { get; set; }

        public string MobileNumber { get; set; }

        public int VillageId { get; set; }

        public virtual LoadType LoadType { get; set; }

        public virtual Transformer Transformer { get; set; }

        public virtual Village Village { get; set; }
    }
}
