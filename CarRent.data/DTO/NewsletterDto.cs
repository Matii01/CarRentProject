using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record NewsletterDto();
    public record SendHistoryDto( 
        string? Title,
        string? Message 
    );

    public record NewsletterSubscriberDto(
         string? Email,
         DateTime? SubscribeDate ,
         DateTime? UnsubscribeDate ,
         int? IsSubscribe 
    );

}
