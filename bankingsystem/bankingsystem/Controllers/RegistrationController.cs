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
using System.Net.Mail;

namespace EBankingMain.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RegistrationController : ApiController
    {
        eBankingEntities entity = null;

        public RegistrationController()
        {
            entity = new eBankingEntities();
        }

        [HttpPost]
        public IHttpActionResult Register(UsersDto usersDto)
        {

            var currentRecord = entity.users.Where(x => x.email == usersDto.email).ToList();
            if(currentRecord.Count > 0)
            {
                return Ok("email");
            }

            var currentRecordUser = entity.users.Where(x => x.username == usersDto.userName).ToList();
            if (currentRecordUser.Count > 0)
            {
                return Ok("username");
            }
            else
            {
                string token = Guid.NewGuid().ToString().Substring(0, 10);
                user addUser = new user
                {
                    firstname = usersDto.firstName,
                    lastname = usersDto.lastName,
                    gender = usersDto.gender,
                    location = usersDto.location,
                    username = usersDto.userName,
                    password = usersDto.password,
                    transactionpassword = usersDto.password,
                    holdername = usersDto.holderName,
                    accountnumber = usersDto.accountNumber,
                    createdon = DateTime.Now,
                    image = "profile.png",
                    contactnumber = usersDto.contactNumber,
                    email = usersDto.email,
                    accountbalance = "100000"
                };

                entity.users.Add(addUser);
                entity.SaveChanges();
                //SendMessageAsync(registrationDto.email, token).Wait();
                return Ok(addUser);
            }
        }


        [HttpPost]
        public IHttpActionResult Login(UsersDto usersDto)
        {
            user loginStatus = null;
            try
            {
                loginStatus = entity.users.First(x => x.username == usersDto.userName && x.password == usersDto.password);
                loginStatus.lastlogin = DateTime.Now;
                loginStatus.randomtext = usersDto.randomText;
                entity.SaveChanges();
                return Ok(loginStatus);
            }
            catch (Exception ex)
            {
                return Ok(loginStatus);
            }
        }


        [HttpGet]
        public IHttpActionResult GetProfileByRandomText(string randomText)
        {
            user record = null;
            try
            {
                record = entity.users.First(x => x.randomtext == randomText);
                if(record.image != "" && record.image != null)
                {
                    var filePath = HttpContext.Current.Server.MapPath("~/UploadFile/" + record.image);
                    if (File.Exists(filePath))
                    {
                        byte[] fileData = File.ReadAllBytes(filePath);
                        record.image = Convert.ToBase64String(fileData); ;
                    }
                }

                return Ok(record);
            }
            catch (Exception ex)
            {
                return Ok(record);
            }
        }


        [HttpGet]
        public IHttpActionResult GetProfile(string accountNumber)
        {
            user record = null;
            try
            {
                record = entity.users.First(x => x.accountnumber == accountNumber);
                if (record.image != "" && record.image != null)
                {
                    var filePath = HttpContext.Current.Server.MapPath("~/UploadFile/" + record.image);
                    if (File.Exists(filePath))
                    {
                        byte[] fileData = File.ReadAllBytes(filePath);
                        record.image = Convert.ToBase64String(fileData); ;
                    }
                }

                return Ok(record);
            }
            catch (Exception ex)
            {
                return Ok(record);
            }
        }


        [HttpPost]
        public IHttpActionResult UpdateProfile(UsersDto usersDto)
        {
            user record = null;
            try
            {
                record = entity.users.First(x => x.accountnumber == usersDto.accountNumber);
                record.firstname = usersDto.firstName;
                record.lastname = usersDto.lastName;
                record.dateofbirth = usersDto.dateofbirth;
                record.gender = usersDto.gender;
                record.location = usersDto.location;
                record.contactnumber = usersDto.contactNumber;
                record.email = usersDto.email;
                record.lastlogin = DateTime.Now;
                entity.SaveChanges();
                return Ok(record);
            }
            catch (Exception ex)
            {
                return Ok(record);
            }
        }


        [HttpPost]
        public IHttpActionResult DestroyRamdonText(string accountnumber)
        {
            var record = entity.users.First(x => x.accountnumber == accountnumber);
            record.randomtext = "";
            entity.SaveChanges();
            return Ok("Ok");
        }





        [HttpPost]
        public IHttpActionResult UpdateImage(string accountnumber)
        {
            var record = entity.users.First(x => x.accountnumber == accountnumber);
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var fileName = Guid.NewGuid().ToString().Substring(0, 6) + postedFile.FileName;
                    record.image = fileName;
                    var filePath = HttpContext.Current.Server.MapPath("~/UploadFile/" + fileName);
                    postedFile.SaveAs(filePath);
                    byte[] fileData = File.ReadAllBytes(filePath);

                    if (fileData == null)
                        throw new HttpResponseException(HttpStatusCode.NotFound);
                    var base64String = Convert.ToBase64String(fileData);
                    entity.SaveChanges();
                    return Ok(base64String);
                }
            }
            return Ok(response);

        }


        [HttpPost]
        public IHttpActionResult ChangePassword(UsersDto usersDto)
        {
            user record = null;
            try
            {
                record = entity.users.First(x => x.accountnumber == usersDto.accountNumber && x.password == usersDto.password);
                record.password = usersDto.newPassword;
                entity.SaveChanges();
                return Ok(record);
            }
            catch (Exception ex)
            {
                return Ok(record);
            }
        }


        [HttpPost]
        public IHttpActionResult ChangeTransactionPassword(UsersDto usersDto)
        {
            user record = null;
            try
            {
                record = entity.users.First(x => x.accountnumber == usersDto.accountNumber && x.transactionpassword == usersDto.transactionPassword);
                record.transactionpassword = usersDto.newTransactionPassword;
                entity.SaveChanges();
                return Ok(record);
            }
            catch (Exception ex)
            {
                return Ok(record);
            }
        }


        [HttpGet]
        public IHttpActionResult CheckTransactionPassword(string accountNumber, string transactionPassword)
        {
            user record = null;
            try
            {
                record = entity.users.First(x => x.accountnumber == accountNumber && x.transactionpassword == transactionPassword);
                return Ok(record.transactionpassword);
            }
            catch (Exception ex)
            {
                return Ok("Error");
            }
        }


        [HttpPost]
        public IHttpActionResult SendMessage(MessageDto messageDto)
        {
            try
            {
                using (MailMessage mm = new MailMessage("xcaliburapp@gmail.com", "xcaliburapp@gmail.com"))
                {
                    mm.Subject = messageDto.subject;
                    mm.Body = "Email Id : " + messageDto.email + "<br>" +
                          "Name : " + messageDto.name + "<br>" +
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
                //SendMessageAsync(messageDto).Wait();
                return Ok("Done");
            }
            catch (Exception ex)
            {
                return Ok("Error");
            }
        }



        private async Task SendMessageAsync(MessageDto messageDto)
        {
            Response response = null;
            try
            {
                var client = new SendGridClient("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");
                var from = new EmailAddress("xcaliburapp@gmail.com");
                var to = new EmailAddress("singhda1997@gmail.com");
                var body = "Email Id : " + messageDto.email + "<br>" +
                           "Name : " + messageDto.name + "<br>" +
                           "Message :" + messageDto.message;
                var msg = MailHelper.CreateSingleEmail(from, to, 
                    messageDto.subject,"", body);
                response = await client.SendEmailAsync(msg).ConfigureAwait(false);
            }
            catch (Exception e)
            {
                var statusCode = response?.StatusCode.ToString() ?? "None";
            }
        }


        //[HttpGet]
        //public IHttpActionResult GetAllLawyers()
        //{
        //    var lawyerList = ecaseEntity.registrations.Where(x => x.accounttype == "2").ToList();
        //    var LawyerSpecaialityList = new List<LawyerSpecialityDto>();

        //    foreach (var lawyer in lawyerList)
        //    {
        //        string specialityName = "";
        //        if (lawyer.speciality != null && lawyer.speciality != "")
        //        {
        //            var specialityId = Convert.ToInt32(lawyer.speciality);
        //            specialityName = ecaseEntity.specialities.First(x => x.id == specialityId).name;
        //        }
        //        LawyerSpecialityDto lawyerSpecialityDto =  new LawyerSpecialityDto {
        //                             Location = lawyer.location,
        //                             Id = lawyer.id,
        //                             Status = Convert.ToBoolean(lawyer.status),
        //                             FirstName = lawyer.firstname,
        //                             LastName = lawyer.lastname,
        //                             SpecalityName = specialityName
        //                         };


        //        LawyerSpecaialityList.Add(lawyerSpecialityDto);
        //    }
        //    return Ok(LawyerSpecaialityList);
        //}


        //[HttpGet]
        //public IHttpActionResult GetAllClients()
        //{
        //    var clientList = ecaseEntity.registrations.Where(x => x.accounttype == "1").ToList();
        //    return Ok(clientList);
        //}


        //[HttpPost]
        //public IHttpActionResult ChangeStatus(int id)
        //{
        //    var record = ecaseEntity.registrations.First(x => x.id == id);
        //    if (record.status == true)
        //    { record.status = false; }
        //    else
        //    { record.status = true; }

        //    ecaseEntity.SaveChanges();
        //    return Ok(record);
        //}


        //[HttpPost]
        //public IHttpActionResult ChangePassword(ChangePasswordDto changePasswordDto)
        //{
        //    registration record = null;
        //    try
        //    {
        //        record = ecaseEntity.registrations.First(x => x.email == changePasswordDto.email && x.password == changePasswordDto.oldPassword);
        //        record.password = changePasswordDto.newPassword;
        //        ecaseEntity.SaveChanges();
        //        return Ok(record);
        //    }
        //    catch(Exception ex)
        //    {
        //        return Ok(record);
        //    }
        //}


        //[HttpGet]
        //public IHttpActionResult GetMemberByEmail(string email)
        // {
        //    registration record = null;
        //    try
        //    {
        //        string base64String = "";
        //        string specialityName = "";
        //        record = ecaseEntity.registrations.First(x => x.email == email);
        //        if (record.speciality != "" && record.speciality != null)
        //        {
        //            int specialityId = Convert.ToInt32(record.speciality);
        //            specialityName = ecaseEntity.specialities.First(x => x.id == specialityId).name;
        //        }

        //        var filePath = HttpContext.Current.Server.MapPath("~/UploadFile/" + record.image);
        //        if (File.Exists(filePath))
        //        {
        //            byte[] fileData = File.ReadAllBytes(filePath);
        //            base64String = Convert.ToBase64String(fileData);
        //            record.image = base64String;
        //            record.speciality = specialityName;
        //        }
        //        return Ok(record);
        //    }
        //    catch(Exception ex)
        //    {
        //        return Ok(record);
        //    }
        //}


        //[HttpGet]
        //public IHttpActionResult GetCases(string email)
        //{
        //    registration record = null;
        //    try
        //    {
        //        record = ecaseEntity.registrations.First(x => x.email == email);
        //        int speciality = Convert.ToInt32(record.speciality);
        //        var caseList = ecaseEntity.cases.Where(x => x.specialityid == speciality ).ToList();

        //        var specailityName = ecaseEntity.specialities.First(x => x.id == speciality).name;

        //        List<CasesRegistrationDto> casesRegistrationDtoList = new List<CasesRegistrationDto>();

        //        foreach (var cas in caseList)
        //        {
        //            var clientRecord = ecaseEntity.registrations.First(x => x.id == cas.clientid);
        //            CasesRegistrationDto casesRegistrationDto = new CasesRegistrationDto
        //            {
        //                id = cas.id,
        //                title = cas.title,
        //                description = cas.description,
        //                clientName = clientRecord.firstname + " " + clientRecord.lastname,
        //                specialityName = specailityName,
        //                approvedLawyerId = Convert.ToInt32(cas.approvedlawyerid)

        //            };

        //            casesRegistrationDtoList.Add(casesRegistrationDto);
        //        }


        //        return Ok(casesRegistrationDtoList);
        //    }
        //    catch (Exception ex)
        //    {
        //        record = null;
        //        return Ok(record);
        //    }
        //}


        //[HttpPost]
        //public IHttpActionResult UpdateProfile(RegistrationDto registrationDto)
        //{
        //    registration record = null;
        //    try
        //    {
        //        record = ecaseEntity.registrations.First(x => x.email == registrationDto.email);
        //        record.firstname = registrationDto.firstName;
        //        record.lastname = registrationDto.lastName;
        //        record.location = registrationDto.location;
        //        record.speciality = registrationDto.speciality;
        //        record.certificateno = registrationDto.certificateNo;
        //        record.aboutme = registrationDto.aboutMe;
        //        ecaseEntity.SaveChanges();
        //        return Ok(record);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(record);
        //    }
        //}


        //[HttpPost]
        //public IHttpActionResult UpdateImage(string emailId)
        //{
        //    var record = ecaseEntity.registrations.First(x => x.email == emailId);
        //    HttpResponseMessage response = new HttpResponseMessage();
        //    var httpRequest = HttpContext.Current.Request;
        //    if (httpRequest.Files.Count > 0)
        //    {
        //        foreach (string file in httpRequest.Files)
        //        {
        //            var postedFile = httpRequest.Files[file];
        //            var fileName = Guid.NewGuid().ToString().Substring(0, 6) + postedFile.FileName;
        //            record.image = fileName;
        //            var filePath = HttpContext.Current.Server.MapPath("~/UploadFile/" + fileName);
        //            postedFile.SaveAs(filePath);
        //            byte[] fileData = File.ReadAllBytes(filePath);

        //            if (fileData == null)
        //                throw new HttpResponseException(HttpStatusCode.NotFound);
        //            //S3:Set Response contents and MediaTypeHeaderValue
        //            var base64String = Convert.ToBase64String(fileData);
        //            //return base64String;
        //            //response.Content = new ByteArrayContent(fileData);
        //            //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

        //            ecaseEntity.SaveChanges();
        //            return Ok(base64String);
        //        }
        //    }
        //    return Ok(response);

        //    //if (Request.Content.IsMimeMultipartContent())
        //    //{
        //    //    var data =  PostFormData();
        //    //    return Ok(data);
        //    //}

        //    //return Ok("Failed");

        //}

        //public Task<HttpResponseMessage> PostFormData()
        //{
        //    // Check if the request contains multipart/form-data.
        //    if (!Request.Content.IsMimeMultipartContent())
        //    {
        //        throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
        //    }

        //    string root = HttpContext.Current.Server.MapPath("~/App_Data");
        //    var provider = new MultipartFormDataStreamProvider(root);

        //    // Read the form data and return an async task.
        //    var task = Request.Content.ReadAsMultipartAsync(provider).
        //        ContinueWith<HttpResponseMessage>(t =>
        //        {
        //            if (t.IsFaulted || t.IsCanceled)
        //            {
        //                Request.CreateErrorResponse(HttpStatusCode.InternalServerError, t.Exception);
        //            }

        //    // This illustrates how to get the file names.
        //    foreach (MultipartFileData file in provider.FileData)
        //            {
        //                Trace.WriteLine(file.Headers.ContentDisposition.FileName);
        //                Trace.WriteLine("Server file path: " + file.LocalFileName);
        //            }
        //            return Request.CreateResponse(HttpStatusCode.OK);
        //        });

        //    return task;
        //}



        //[HttpPost]
        //public IHttpActionResult VerifyToken(string token)
        //{
        //    registration record = null;
        //    try
        //    {
        //        record = ecaseEntity.registrations.First(x => x.token == token);
        //        record.status = true;
        //        ecaseEntity.SaveChanges();
        //        return Ok(record);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(record);
        //    }
        //}


        
    }
}
