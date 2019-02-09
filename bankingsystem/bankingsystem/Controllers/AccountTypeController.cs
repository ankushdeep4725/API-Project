using EBankingMain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Web;
using System.Diagnostics;
using System.Net.Http.Headers;
using System.IO;
using System.Web.Script.Serialization;
using bankingsystem;
using System.Data.Objects;

namespace EBankingMain.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AccountTypeController : ApiController
    {
        eBankingEntities entity = null;

        public AccountTypeController()
        {
            entity = new eBankingEntities();
        }

        [HttpPost]
        public IHttpActionResult SaveAccountType(AccountTypeDto accountTypeDto)
        {
            try
            {
                var account = entity.accounts.Where(x => x.accounttype == accountTypeDto.accounttype).First();
                account.accountdesc1 = accountTypeDto.accountdesc1;
                account.accountdesc2 = accountTypeDto.accountdesc2;
                entity.SaveChanges();
                return Ok(account);
            }
            catch(Exception ex)
            {
                var account = new account
                {
                    accounttype = accountTypeDto.accounttype,
                    accountdesc1 = accountTypeDto.accountdesc1,
                    accountdesc2 = accountTypeDto.accountdesc2
                };

                entity.accounts.Add(account);
                entity.SaveChanges();
                return Ok(account);
            }
           
        }

        //[HttpPost]
        //public IHttpActionResult UpdateAccountTypeDescription(AccountTypeDto accountTypeDto)
        //{
        //    var account = entity.accounts.Where(x => x.id == accountTypeDto.id).First();
        //    account.accountdesc1 = accountTypeDto.accountdesc1;
        //    account.accountdesc2 = accountTypeDto.accountdesc2;
        //    entity.SaveChanges();
        //    return Ok(account);
        //}

        [HttpGet]
        public IHttpActionResult GetAccountTypeById(int id)
        {
            var account = entity.accounts.Where(x=>x.id == id).ToList();
            return Ok(account);
        }


        [HttpPost]
        public IHttpActionResult SendFAQ(MessageDto messageDto)
        {
            try
            {
                SendFAQAsync(messageDto).Wait();
                return Ok("Done");
            }
            catch (Exception ex)
            {
                return Ok("Error");
            }
        }

        private async Task SendFAQAsync(MessageDto messageDto)
        {
            Response response = null;
            try
            {
                var client = new SendGridClient("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");
                var from = new EmailAddress("xcaliburapp@gmail.com");
                var to = new EmailAddress("baljeetpnf@gmail.com");
                var body = "Email Id : " + messageDto.email + "<br>" +
                           "Name : " + messageDto.name + "<br>" +
                           "MessageType : Frequently Asked Question <br>" + 
                           "Message :" + messageDto.message;
                var msg = MailHelper.CreateSingleEmail(from, to,
                    messageDto.subject, "", body);
                response = await client.SendEmailAsync(msg).ConfigureAwait(false);
            }
            catch (Exception e)
            {
                var statusCode = response?.StatusCode.ToString() ?? "None";
            }
        }
    }

}
