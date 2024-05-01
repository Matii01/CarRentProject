using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CMS
{
    public class Footer : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? NewsLetterTitle { get; set; }
        public string? NewsLetterDescription { get; set; }
        public string? NewsLetterInfo { get; set; }
        public string? FacebookLink { get; set; }
        public string? YouTubeLink { get; set; }
        public string? InstagramLink { get; set; }
        public string? TikTokLink { get; set; }
        public string? Info { get; set; }
        public IEnumerable<FooterLinks> Links { get; set; } = new List<FooterLinks>();
    }
}
