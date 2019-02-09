using BankServices.Models;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace BankServices.Controllers
{
    public class AdminController : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Savings()
        {
            if (!(TempData.Keys.Count > 0 && TempData.ContainsKey("role")))
            {
                return RedirectToAction("Login");
            }

            if (TempData.Keys.Count > 0 && TempData.ContainsKey("Panel"))
            {
                ViewBag.Panel = TempData["Panel"].ToString();
            }

            
            TempData["CurrentAction"] = "Savings";
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=SAVING", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            if (accountDetailFullDtoList == null)
            {
                accountDetailFullDtoList = new AccountDetailFullDto();
                accountDetailFullDtoList.type = "SAVING";
            }

            return View(accountDetailFullDtoList);
        }

        public ActionResult Salary()
        {
            if (!(TempData.Keys.Count > 0 && TempData.ContainsKey("role")))
            {
                return RedirectToAction("Login");
            }

            if (TempData.Keys.Count > 0 && TempData.ContainsKey("Panel"))
            {
                ViewBag.Panel = TempData["Panel"].ToString();
            }



            TempData["CurrentAction"] = "Salary";

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=SALARY", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            if (accountDetailFullDtoList == null)
            {
                accountDetailFullDtoList = new AccountDetailFullDto();
                accountDetailFullDtoList.type = "SALARY";
            }

            return View(accountDetailFullDtoList);
        }

        public ActionResult Current()
        {
            if (!(TempData.Keys.Count > 0 && TempData.ContainsKey("role")))
            {
                return RedirectToAction("Login");
            }

            if (TempData.Keys.Count > 0 && TempData.ContainsKey("Panel"))
            {
                ViewBag.Panel = TempData["Panel"].ToString();
            }


            TempData["CurrentAction"] = "Current";

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=CURRENT", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            if (accountDetailFullDtoList == null)
            {
                accountDetailFullDtoList = new AccountDetailFullDto();
                accountDetailFullDtoList.type = "CURRENT";
            }

            return View(accountDetailFullDtoList);
        }

        public ActionResult DirectInvest()
        {
            if (!(TempData.Keys.Count > 0 && TempData.ContainsKey("role")))
            {
                return RedirectToAction("Login");
            }

            if (TempData.Keys.Count > 0 && TempData.ContainsKey("Panel"))
            {
                ViewBag.Panel = TempData["Panel"].ToString();
            }


            TempData["CurrentAction"] = "DirectInvest";

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=DIRECTINVEST", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            if (accountDetailFullDtoList == null)
            {
                accountDetailFullDtoList = new AccountDetailFullDto();
                accountDetailFullDtoList.type = "DIRECTINVEST";
            }

            return View(accountDetailFullDtoList);
        }

        public ActionResult SafeDeposit()
        {
            if (!(TempData.Keys.Count > 0 && TempData.ContainsKey("role")))
            {
                return RedirectToAction("Login");
            }

            if (TempData.Keys.Count > 0 && TempData.ContainsKey("Panel"))
            {
                ViewBag.Panel = TempData["Panel"].ToString();
            }


            TempData["CurrentAction"] = "SafeDeposit";

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=SAFEDEPOSIT", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            if (accountDetailFullDtoList == null)
            {
                accountDetailFullDtoList = new AccountDetailFullDto();
                accountDetailFullDtoList.type = "SAFEDEPOSIT";
            }

            return View(accountDetailFullDtoList);
        }

        public ActionResult Pension()
        {
            if (!(TempData.Keys.Count > 0 && TempData.ContainsKey("role")))
            {
                return RedirectToAction("Login");
            }

            if (TempData.Keys.Count > 0 && TempData.ContainsKey("Panel"))
            {
                ViewBag.Panel = TempData["Panel"].ToString();
            }


            TempData["CurrentAction"] = "Pension";

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/GetAccountDetail?type=PENSION", Method.GET);
            var result = restClient.Execute(restRequest);
            AccountDetailFullDto accountDetailFullDtoList = JsonConvert.DeserializeObject<AccountDetailFullDto>(result.Content);
            if (accountDetailFullDtoList == null)
            {
                accountDetailFullDtoList = new AccountDetailFullDto();
                accountDetailFullDtoList.type = "PENSION";
            }

            return View(accountDetailFullDtoList);
        }





        [HttpPost]
        public ActionResult AccountDetail(string type, string title,string para1, string para2, string heading)
        {
            var accountDetail = new AccountDetailDto
            {
                type = type,
                title = title,
                para1 = para1,
                para2 = para2,
                heading = heading
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/AccountDetail", Method.POST);
            restRequest.AddObject(accountDetail);
            var result = restClient.Execute(restRequest);

            var parentAction = TempData["CurrentAction"].ToString();
            TempData["Panel"] = "Panel0";
            return RedirectToAction(parentAction);

        }


        [HttpPost]
        public ActionResult AccountDetailPanel1(string type, string panel1Title, string panel1Subtitle1, string panel1Subtitle1Content, 
                                                string panel1Subtitle2, string panel1Subtitle2Content, string panel1Subtitle3, string panel1Subtitle3Content)
        {
            var accountDetailPanel1 = new AccountDetailPanel1Dto
            {
                type = type,
                panel1Title = panel1Title,
                panel1Subtitle1 = panel1Subtitle1,
                panel1Subtitle1Content = panel1Subtitle1Content,
                panel1Subtitle2 = panel1Subtitle2,
                panel1Subtitle2Content = panel1Subtitle2Content,
                panel1Subtitle3 = panel1Subtitle3,
                panel1Subtitle3Content = panel1Subtitle3Content
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/AccountDetailPanel1", Method.POST);
            restRequest.AddObject(accountDetailPanel1);
            var result = restClient.Execute(restRequest);
            var parentAction = TempData["CurrentAction"].ToString();
            TempData["Panel"] = "Panel1";
            return RedirectToAction(parentAction);
        }

        [HttpPost]
        public ActionResult AccountDetailPanel2(string type, string panel2Title, string panel2Subtitle1, string panel2Subtitle1Content,
                                                string panel2Subtitle2, string panel2Subtitle2Content, string panel2Subtitle3, 
                                                string panel2Subtitle3Content)
        {
            var accountDetailPanel2 = new AccountDetailPanel2Dto
            { 
                type = type,
                panel2Title = panel2Title,
                panel2Subtitle1 = panel2Subtitle1,
                panel2Subtitle1Content = panel2Subtitle1Content,
                panel2Subtitle2 = panel2Subtitle2,
                panel2Subtitle2Content = panel2Subtitle2Content,
                panel2Subtitle3 = panel2Subtitle3,
                panel2Subtitle3Content = panel2Subtitle3Content
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/AccountDetailPanel2", Method.POST);
            restRequest.AddObject(accountDetailPanel2);
            var result = restClient.Execute(restRequest);
            TempData["Panel"] = "Panel2";
            var parentAction = TempData["CurrentAction"].ToString();
            return RedirectToAction(parentAction);
        }

        [HttpPost]
        public ActionResult AccountDetailPanel3(string type, string panel3Title, string panel3Subtitle1, string panel3Subtitle1Content,
                                               string panel3Subtitle2, string panel3Subtitle2Content, string panel3Subtitle3,
                                               string panel3Subtitle3Content)
        {
            var accountDetailPanel3 = new AccountDetailPanel3Dto
            {
                type = type,
                panel3Title = panel3Title,
                panel3Subtitle1 = panel3Subtitle1,
                panel3Subtitle1Content = panel3Subtitle1Content,
                panel3Subtitle2 = panel3Subtitle2,
                panel3Subtitle2Content = panel3Subtitle2Content,
                panel3Subtitle3 = panel3Subtitle3,
                panel3Subtitle3Content = panel3Subtitle3Content
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/AccountDetailPanel3", Method.POST);
            restRequest.AddObject(accountDetailPanel3);
            var result = restClient.Execute(restRequest);
            TempData["Panel"] = "Panel3";
            var parentAction = TempData["CurrentAction"].ToString();
            return RedirectToAction(parentAction);
        }


        [HttpPost]
        public ActionResult AccountDetailPanel4(string type, string panel4Title, string panel4Subtitle1, string panel4Subtitle1Content,
                                               string panel4Subtitle2, string panel4Subtitle2Content, string panel4Subtitle3,
                                                                                                                                                                                                                        string panel4Subtitle3Content)
        {
            var accountDetailPanel4 = new AccountDetailPanel4Dto
            {
                type = type,
                panel4Title = panel4Title,
                panel4Subtitle1 = panel4Subtitle1,
                panel4Subtitle1Content = panel4Subtitle1Content,
                panel4Subtitle2 = panel4Subtitle2,
                panel4Subtitle2Content = panel4Subtitle2Content,
                panel4Subtitle3 = panel4Subtitle3,
                panel4Subtitle3Content = panel4Subtitle3Content
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/AccountDetailPanel4", Method.POST);
            restRequest.AddObject(accountDetailPanel4);
            var result = restClient.Execute(restRequest);
            TempData["Panel"] = "Panel4";
            var parentAction = TempData["CurrentAction"].ToString();
            return RedirectToAction(parentAction);
        }


        [HttpPost]
        public ActionResult AccountDetailPanel5(string type,string panel5Title, string panel5Subtitle1, string panel5Subtitle1Content,
                                              string panel5Subtitle2, string panel5Subtitle2Content, string panel5Subtitle3,
                                              string panel5Subtitle3Content)
        {
            var accountDetailPanel5 = new AccountDetailPanel5Dto
            {
                type = type,
                panel5Title = panel5Title,
                panel5Subtitle1 = panel5Subtitle1,
                panel5Subtitle1Content = panel5Subtitle1Content,
                panel5Subtitle2 = panel5Subtitle2,
                panel5Subtitle2Content = panel5Subtitle2Content,
                panel5Subtitle3 = panel5Subtitle3,
                panel5Subtitle3Content = panel5Subtitle3Content
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/AccountDetailPanel5", Method.POST);
            restRequest.AddObject(accountDetailPanel5);
            var result = restClient.Execute(restRequest);
            TempData["Panel"] = "Panel5";
            var parentAction = TempData["CurrentAction"].ToString();
            return RedirectToAction(parentAction);
        }

        [HttpPost]
        public ActionResult AccountDetailPanel6(string type, string panel6Title, string panel6Subtitle1, string panel6Subtitle1Content,
                                              string panel6Subtitle2, string panel6Subtitle2Content, string panel6Subtitle3,
                                              string panel6Subtitle3Content)
        {
            var accountDetailPanel6 = new AccountDetailPanel6Dto
            {
                type = type,
                panel6Title = panel6Title,
                panel6Subtitle1 = panel6Subtitle1,
                panel6Subtitle1Content = panel6Subtitle1Content,
                panel6Subtitle2 = panel6Subtitle2,
                panel6Subtitle2Content = panel6Subtitle2Content,
                panel6Subtitle3 = panel6Subtitle3,
                panel6Subtitle3Content = panel6Subtitle3Content
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/AccountDetailPanel6", Method.POST);
            restRequest.AddObject(accountDetailPanel6);
            var result = restClient.Execute(restRequest);
            TempData["Panel"] = "Panel6";
            var parentAction = TempData["CurrentAction"].ToString();
            return RedirectToAction(parentAction);
        }

       
        public ActionResult FAQ()
        {
            if (!(TempData.Keys.Count > 0 && TempData.ContainsKey("role")))
            {
                return RedirectToAction("Login");
            }

            if (TempData.Keys.Count > 0 && TempData.ContainsKey("MainPanel"))
            {
                ViewBag.Panel = TempData["MainPanel"].ToString();
            }


            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/FAQ/GetFAQ", Method.GET);
            var result = restClient.Execute(restRequest);
            List<FAQDto> faqList = JsonConvert.DeserializeObject<List<FAQDto>>(result.Content);
            return View(faqList);
        }

        [HttpPost]
        public ActionResult FAQ(string id)
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/FAQ/FindFAQ/"+id, Method.GET);
            var result = restClient.Execute(restRequest);
            List<FAQDto> faqList = JsonConvert.DeserializeObject<List<FAQDto>>(result.Content);
            return Json(faqList[0]);
        }

        [HttpPost]
        public ActionResult UpdateFAQ(int id, string question, string answer)
        {
            var faqDto = new FAQDto
            {
                id = id,
                question = question,
                answer = answer
            };
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/FAQ/UpdateFAQ", Method.POST);
            restRequest.AddObject(faqDto);
            var result = restClient.Execute(restRequest);
            TempData["MainPanel"] = "MainPanel";
            return Json(result.Content);
            
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string password)
        {
            var adminUserDto = new AdminUsersDto
            {
                userName = "admin",
                password = password
            };

            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Account/AdminLogin", Method.POST);
            restRequest.AddObject(adminUserDto);
            var result = restClient.Execute(restRequest);

            if(Convert.ToInt32(result.Content) > 0)
            {
                TempData["role"] = "administrator";
                return RedirectToAction("Savings");
            }
            else
            {
                ViewBag.AdminMessage = "Not Login";
            }

            return View();
        }


        [HttpGet]
        public ActionResult Logout()
        {
            TempData.Clear();
            return Redirect("/Home/Index");
        }

        //[HttpPost]
        //public ActionResult Login(string username, string password)
        //{
        //    RestClient restClient = new RestClient();
        //    restClient.BaseUrl = new Uri("http://localhost:54178/");
        //    var restRequest = new RestRequest($"api/Registration/Login", Method.POST);
        //    var usersDto = new UsersDto();
        //    usersDto.userName = username;
        //    usersDto.password = password;
        //    usersDto.randomText = Guid.NewGuid().ToString().Substring(1, 7);
        //    restRequest.AddObject(usersDto);
        //    var result = restClient.Execute(restRequest);
        //    if(result.Content == null || result.Content == "null")
        //    {
        //        ViewBag.Message =  "Wrong username and password";
        //    }
        //    else
        //    {
        //        ViewBag.Message = "Login";
        //    }
        //    return View();
        //}

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(string firstname, string lastname, string address,
            string email, string city, string gender, string username, string password, string repassword, string agree)
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/Registration/Register", Method.POST);
            var usersDto = new UsersDto();

            var addUser = new UsersDto
            {
                firstName = firstname,
                lastName = lastname,
                gender = gender,
                location = address,
                userName = username,
                password = password,
                transactionPassword = password,
                holderName = username,
                accountNumber = "54353",
                createdOn = DateTime.Now,
                image = "profile.png",
                contactNumber = usersDto.contactNumber,
                email = usersDto.email,
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


        public ActionResult Saving()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Saving(string accountdesc1, string accountdesc2)
        {
            RestClient restClient = new RestClient();
            restClient.BaseUrl = new Uri("http://localhost:54178/");
            var restRequest = new RestRequest($"api/AccountType/SaveAccountType", Method.POST);
            var accountTypeDto = new AccountTypeDto();
            accountTypeDto.accounttype = "Saving";
            accountTypeDto.accountdesc1 = accountdesc1;
            accountTypeDto.accountdesc2 = accountdesc2;
            restRequest.AddObject(accountTypeDto);
            var result = restClient.Execute(restRequest);
            return View();
        }



    }
}