namespace mabyWorking.Models
{
    public class Question
    {
        public int id { get; set; }
        public string description { get; set; }
        public string answer { get; set; }
        public string comment { get; set; }
        public string area { get; set; }
        public int level { get; set; }
        public int skillID { get; set; }

        public Skill Skill { get; set; }
        public ICollection<Solved_question> Solved_Questions { get; set; }

    }
}