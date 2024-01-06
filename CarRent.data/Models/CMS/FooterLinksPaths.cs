using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models.CMS
{
    public class FooterLinksPaths : BaseDictionaryModel
    {
        public override int Id { get; set; }
        public int FooterLinksId { get; set; }
        public FooterLinks FooterLinks { get; set; }

        public string Name { get; set; }
        public string Path { get; set; }
        public int DisplayPosition { get; set; }
    }
}
