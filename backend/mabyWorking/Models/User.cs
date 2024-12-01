namespace mabyWorking.Models
{
    public class User
    {
        public int id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public int coins { get; set; }

        public int experience { get; set; }
        public int unsolved_questions { get; set; }
        public int solved_questions { get; set; }
        public string image { get; set; }

        public ICollection<Progress_in_skills> Progresses_in_skills { get; set; }
        public ICollection<Solved_question> Solved_Questions { get; set; }
        public ICollection<User_expirience_in_areas> User_Expiriences_In_Areas { get; set; }
    }
}