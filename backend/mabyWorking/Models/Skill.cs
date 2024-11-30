namespace mabyWorking.Models
{
    public class Skill
    {
        public int Id { get; set; }
        //public string Description { get; set; }
        public string Name { get; set; }
        public int Max_level { get; set; }
        public int DirectionID { get; set; }
        public string Image { get; set; }

        public Direction Direction { get; set; }

        public ICollection<Progress_in_skills> Progresses_in_skils { get; set; }
        public ICollection<Question> Questions
        {
            get; set;
        }
        }
}
