﻿using CarRent.data.DTO;
using CarRent.data.Models.CMS;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    [Authorize(Roles = "Administrator,PageEditor")]
    public class ContentManagementController : BaseController
    {
        public ContentManagementController(IServiceManager serviceManager) 
            : base(serviceManager)
        {
        }

        [AllowAnonymous]
        [HttpGet("homePage")]
        public async Task<IActionResult> GetHomePage()
        {
            var home = await _services.ContentManagementService.GetHomePage();
            return Ok(home);
        }

        [AllowAnonymous]
        [HttpGet("contact")]
        public async Task<IActionResult> GetContactPage()
        {
            var contactPage = await _services.ContentManagementService.GetContactPage();
            return Ok(contactPage);
        }

        [AllowAnonymous]
        [HttpGet("footer")]
        public async Task<IActionResult> GetFooter()
        {
            var footer = await _services.ContentManagementService.GetFooter();
            return Ok(footer);
        }

        [HttpPost("editContact")]
        public async Task<IActionResult> EditContactPage([FromBody] ContactPageDto contact)
        {
            await _services.ContentManagementService.EditContactPage(contact);
            return NoContent();
        }

        [HttpPost("editHomePage")]
        public async Task<IActionResult> EditHomePage([FromBody] HomePageDto homePage)
        {
            await Console.Out.WriteLineAsync("edit home page");
            await _services.ContentManagementService.EditHomePage(homePage);
            return NoContent();
        }
    }
}
