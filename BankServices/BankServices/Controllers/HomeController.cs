using BankServices.Models;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BankServices.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {

            if (TempData.Keys.Count > 0 && TempData.ContainsKey("SendMessage"))
            {
                ViewBag.SendMessage = TempData["SendMessage"].ToString();
            }

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/FAQ/GetFAQ", Method.GET);
            var result = restClient.Execute(restRequest);
            List<FAQDto> faqList = JsonConvert.DeserializeObject<List<FAQDto>>(result.Content);
            return View(faqList);
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult FAQ(string fname, string email,  string subject, string msg)
        {
            var message = new MessageDto
            {
                name = fname,
                email = email,
                subject = subject,
                message = msg
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/FAQ/SendFAQ", Method.POST);
            restRequest.AddObject(message);
            var result = restClient.Execute(restRequest);

            if (result.Content == "Error")
            {
                TempData["SendMessage"] = "Not able to complete request. Please try after sometime.";
            }
            else
            {
                TempData["SendMessage"] = "We will revert your reply shortly";
            }


            return RedirectToAction("Index");

        }

        public ActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Contact(string fname, string email, string subject, string msg)
        {
            var message = new MessageDto
            {
                name = fname,
                email = email,
                subject = subject,
                message = msg
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Registration/SendMessage", Method.POST);
            restRequest.AddObject(message);
            var result = restClient.Execute(restRequest);

            if (result.Content == "Error")
            {
                TempData["SendMessage"] = "Not able to complete request. Please try after sometime.";
            }
            else
            {
                TempData["SendMessage"] = "We will revert your reply shortly";
            }

            ViewBag.MessageSend = "Our Bank Executive will be in touch with you shortly. Thanks!!!";
            return View();

        }

        public ActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Registration/Login", Method.POST);
            var usersDto = new UsersDto();
            usersDto.userName = username;
            usersDto.password = password;
            usersDto.randomText = Guid.NewGuid().ToString().Substring(1, 7);
            restRequest.AddObject(usersDto);
            var result = restClient.Execute(restRequest);
            if(result.Content == null || result.Content == "null")
            {
                ViewBag.Message =  "Wrong username and password";
            }
            else
            {
                return Redirect("http://localhost:4400/membersection/view/dashboard?v="+usersDto.randomText);
            }
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }


        //public string getrandomAccountNumber()
        //{
        //    return Math.Floor(new Random() .Next(0,1)* (999999999999 - 111111111111 + 1) + 111111111111);
        //}


        [HttpPost]
        public ActionResult Register(string firstname, string lastname, string address,
            string email, string city, string gender, string username, string password, string repassword, string agree)
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Registration/Register", Method.POST);
            var usersDto = new UsersDto()
            {
                firstName = firstname,
                lastName = lastname,
                gender = gender,
                location = address+ " " + city,
                userName = username,
                password = password,
                transactionPassword = password,
                holderName = username,
                accountNumber = "54353",
                createdOn = DateTime.Now,
                image = "profile.png",
                contactNumber = "",
                email = email,
            };

            if (agree != "" || agree != null)
            {
                if (password != repassword)
                {
                    ViewBag.Message = "Mismatch Passowd and Re-Type Password";
                }
                else
                {
                    restRequest.AddObject(usersDto);

                    var result = restClient.Execute(restRequest);
                    if (result.Content == null || result.Content == "null")
                    {
                        ViewBag.Message = "Wrong username and password";
                    }
                    else
                    {
                        ViewBag.Message = "Login";
                    }
                }
            }
            else
            {
                ViewBag.Message = "Please accept the agree terms and conditions";
            }

            return View();
        }

        public ActionResult Services()
        {
            return View();
        }

        public ActionResult Salary()
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=SALARY", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            return View(accountDetailFullDtoList);
        }

        public ActionResult Current()
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=CURRENT", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            return View(accountDetailFullDtoList);
        }


        public ActionResult Savings()
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=SAVING", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            return View(accountDetailFullDtoList);
        }


        public ActionResult SafeDeposit()
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=SAFEDEPOSIT", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            return View(accountDetailFullDtoList);
        }

        public ActionResult DirectInvest()
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=DIRECTINVEST", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            return View(accountDetailFullDtoList);
        }

        public ActionResult Pension()
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=PENSION", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            return View(accountDetailFullDtoList);
        }




    }
}