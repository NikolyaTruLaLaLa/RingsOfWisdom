namespace mabyWorking.Models
{
    public class Progress_in_skills
    {
        public int Id { get; set; }
        public int userID { get; set; }

        public int skillID { get; set; }
        public int solved_quizes { get; set; }
        public int level { get; set; }

        public User User { get; set; }
        public Skill Skill { get; set; }
    }
}
