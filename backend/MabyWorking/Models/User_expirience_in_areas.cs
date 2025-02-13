namespace mabyWorking.Models
{
    public class User_expirience_in_areas
    {
        public int id { get; set; }
        public int areaID { get; set; }
        public int userID { get; set; }
        public int experience { get; set; }

        public Area Area { get; set; }
        public User User { get; set; }
    }
}