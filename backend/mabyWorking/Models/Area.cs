namespace mabyWorking.Models
{
    public class Area
    {
        public int id { get; set; }
        public string name { get; set; }
        public ICollection<User_expirience_in_areas> Users_expirience_in_areas { get; set; }
    }
}
