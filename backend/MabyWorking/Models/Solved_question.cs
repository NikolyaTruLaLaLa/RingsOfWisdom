namespace mabyWorking.Models
{
    public class Solved_question
    {
        public int id { get; set; }
        public int userID { get; set; }
        public int questionID { get; set; }

        public bool checking { get; set; }
        public User User { get; set; }
        public Question Question { get; set; }
    }
}