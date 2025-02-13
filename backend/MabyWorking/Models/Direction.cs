namespace mabyWorking.Models
{
    public class Direction
    {
        public int id { get; set; }

        public string name { get; set; }
        public string image { get; set; }

        public ICollection<Skill> Skills { get; set; }
    }
}