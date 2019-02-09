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
using bankingsystem.Models;
using System.Net.Mail;

namespace EBankingMain.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FAQController : ApiController
    {
        eBankingEntities entity = null;

        public FAQController()
        {
            entity = new eBankingEntities();
        }


        [HttpPost]
        public IHttpActionResult UpdateFAQ(FAQDto fAQDto)
        {
            var faq = entity.faqs.Where(x => x.id == fAQDto.id).First();
            faq.question = fAQDto.question;
            faq.answer = fAQDto.answer;
            entity.SaveChanges();
            return Ok(faq);
        }


        [HttpGet]
        public IHttpActionResult GetFAQ()
        {
            var faqs = entity.faqs.ToList();
            return Ok(faqs);
        }



        [HttpGet]
        public IHttpActionResult FindFAQ(int id)
        {
            var faqs = entity.faqs.Where(x=>x.id == id).ToList();
            return Ok(faqs);
        }


        [HttpPost]
        public IHttpActionResult SendFAQ(MessageDto messageDto)
        {
            try
            {
                using (MailMessage mm = new MailMessage("xcaliburapp@gmail.com", "xcaliburapp@gmail.com"))
                {
                    mm.Subject = messageDto.subject;
                    mm.Body = "Email Id : " + messageDto.email + "<br>" +
                          "Name : " + messageDto.name + "<br>" +
                          "Subject : " + messageDto.subject + " <br>" +
                          "Message :" + messageDto.message;

                    mm.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Host = "smtp.gmail.com";
                        smtp.EnableSsl = true;
                        NetworkCredential NetworkCred = new NetworkCredential("xcaliburapp@gmail.com", "kahlon4725");
                        smtp.UseDefaultCredentials = true;
                        smtp.Credentials = NetworkCred;
                        smtp.Port = 587;
                        smtp.Send(mm);
                    }
                }
                return Ok("Done");
            }
            catch (Exception ex)
            {
                return Ok("Error");
            }
        }
    }

}
