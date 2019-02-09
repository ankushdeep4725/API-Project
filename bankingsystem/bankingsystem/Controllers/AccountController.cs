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
    public class AccountController : ApiController
    {
        eBankingEntities entity = null;

        public AccountController()
        {
            entity = new eBankingEntities();
        }

        [HttpPost]
        public IHttpActionResult AddBeneficiary(BeneficiaryDto beneficiaryDto)
        {
            beneficiary addBeneficiary = new beneficiary
            {
                name = beneficiaryDto.name,
                nickname = beneficiaryDto.nickName,
                accountnumber = beneficiaryDto.accountNumber,
                ifsccode = beneficiaryDto.ifscCode,
                maxamount = beneficiaryDto.maxAmount,
                maxtransactions = beneficiaryDto.maxTransactions,
                address = beneficiaryDto.address,
                usersaccountnumber = beneficiaryDto.usersAccountNumber
            };

            entity.beneficiaries.Add(addBeneficiary);
            entity.SaveChanges();
            return Ok(addBeneficiary);
        }


        [HttpGet]
        public IHttpActionResult ViewBeneficiary(string accountNumber)
        {
            var beneficiaries = entity.beneficiaries.Where(x => x.usersaccountnumber == accountNumber).ToList();
            return Ok(beneficiaries);
        }


        [HttpGet]
        public IHttpActionResult CheckAccountExists(string accountNumber)
        {
            var isAccountExists = entity.users.Where(x => x.accountnumber == accountNumber).ToList();
            return Ok(isAccountExists.Count);
        }


        [HttpGet]
        public IHttpActionResult AddTransactionsForBankServices(string accountNumber, string message, string amount)
        {
            transaction addTransaction = new transaction();
            var checkSenderTransactions = entity.users.Where(x => x.accountnumber == accountNumber).OrderByDescending(x => x.id).First();
            var currentSenderBalance = checkSenderTransactions.accountbalance;

            try
            {
                addTransaction.name = message;
                addTransaction.senderaccountnumber = accountNumber;
                addTransaction.receiveraccountnumber = accountNumber;
                addTransaction.transactiondate = DateTime.Now;
                addTransaction.creditamount = "0";
                addTransaction.debitamount = amount;
                addTransaction.senderbalanceamount = (Convert.ToDouble(currentSenderBalance) - Convert.ToDouble(amount)).ToString();
                addTransaction.receiverbalanceamount = "0";
                entity.transactions.Add(addTransaction);
                entity.SaveChanges();


                var userAccount = entity.users.First(x => x.accountnumber == accountNumber);
                userAccount.accountbalance = addTransaction.senderbalanceamount;
                entity.SaveChanges();

                return Ok(addTransaction);
            }
            catch (Exception ex)
            {
                return Ok("Error");
            }
        }




        [HttpPost]
        public IHttpActionResult AddFirstTransactions(TransactionsDto transactionsDto)
        {
            transaction addTransaction = new transaction();
            try
            {
                addTransaction.name = transactionsDto.name;
                addTransaction.nickname = transactionsDto.nickName;
                addTransaction.senderaccountnumber = transactionsDto.senderaccountnumber;
                addTransaction.receiveraccountnumber = transactionsDto.receiveraccountnumber;
                addTransaction.ifsccode = transactionsDto.ifscCode;
                addTransaction.transactiondate = DateTime.Now;
                addTransaction.creditamount = transactionsDto.creditamount;
                addTransaction.debitamount = transactionsDto.debitamount;
                addTransaction.senderbalanceamount = transactionsDto.creditamount;
                addTransaction.receiverbalanceamount = "0";
                entity.transactions.Add(addTransaction);
                entity.SaveChanges();
                return Ok(addTransaction);
            }
            catch (Exception ex)
            {
                return Ok("Error");
            }
        }


        [HttpPost]
        public IHttpActionResult AddTransactionsForSameBank(TransactionsDto transactionsDto)
        {
            transaction addTransaction = new transaction();
            string currentSenderBalance = "";
            string currentReceiverBalance = "";
            try
            {
                var checkSenderTransactions = entity.users.Where(x => x.accountnumber == transactionsDto.senderaccountnumber).OrderByDescending(x => x.id).First();
                currentSenderBalance = checkSenderTransactions.accountbalance;

                var checkReceiverTransactions = entity.users.Where(x => x.accountnumber == transactionsDto.receiveraccountnumber).OrderByDescending(x => x.id).First();
                currentReceiverBalance = checkReceiverTransactions.accountbalance;
            }
            catch (Exception ex)
            {
                currentSenderBalance = "0";
                currentReceiverBalance = "0";
            }
            finally
            {
                addTransaction.name = transactionsDto.name;
                addTransaction.nickname = transactionsDto.nickName;
                addTransaction.senderaccountnumber = transactionsDto.senderaccountnumber;
                addTransaction.receiveraccountnumber = transactionsDto.receiveraccountnumber;
                addTransaction.ifsccode = transactionsDto.ifscCode;
                addTransaction.transactiondate = DateTime.Now;
                addTransaction.creditamount = transactionsDto.creditamount;
                addTransaction.debitamount = transactionsDto.debitamount;
                addTransaction.senderbalanceamount = ((Convert.ToDouble(currentSenderBalance) + Convert.ToDouble(transactionsDto.creditamount)) - Convert.ToDouble(transactionsDto.debitamount)).ToString();
                addTransaction.receiverbalanceamount = ((Convert.ToDouble(currentReceiverBalance) + Convert.ToDouble(transactionsDto.debitamount))).ToString();
                entity.transactions.Add(addTransaction);
                entity.SaveChanges();

                var userAccount = entity.users.First(x => x.accountnumber == transactionsDto.senderaccountnumber);
                userAccount.accountbalance = addTransaction.senderbalanceamount;
                entity.SaveChanges();


                var userreceiverAccount = entity.users.First(x => x.accountnumber == transactionsDto.receiveraccountnumber);
                userreceiverAccount.accountbalance = addTransaction.receiverbalanceamount;
                entity.SaveChanges();

            }
            return Ok(addTransaction);
        }



        [HttpPost]
        public IHttpActionResult AddTransactionsForDifferentBank(TransactionsDto transactionsDto)
        {
            transaction addTransaction = new transaction();
            string currentSenderBalance = "";
            try
            {
                var checkSenderTransactions = entity.users.Where(x => x.accountnumber == transactionsDto.senderaccountnumber).OrderByDescending(x => x.id).First();
                currentSenderBalance = checkSenderTransactions.accountbalance;
            }
            catch (Exception ex)
            {
                currentSenderBalance = "0";
            }
            finally
            {
                addTransaction.name = transactionsDto.name;
                addTransaction.nickname = transactionsDto.nickName;
                addTransaction.senderaccountnumber = transactionsDto.senderaccountnumber;
                addTransaction.receiveraccountnumber = transactionsDto.receiveraccountnumber;
                addTransaction.ifsccode = transactionsDto.ifscCode;
                addTransaction.transactiondate = DateTime.Now;
                addTransaction.creditamount = transactionsDto.creditamount;
                addTransaction.debitamount = transactionsDto.debitamount;
                addTransaction.senderbalanceamount = ((Convert.ToDouble(currentSenderBalance) + Convert.ToDouble(transactionsDto.creditamount)) - Convert.ToDouble(transactionsDto.debitamount)).ToString();
                entity.transactions.Add(addTransaction);
                entity.SaveChanges();

                var userAccount = entity.users.First(x => x.accountnumber == transactionsDto.senderaccountnumber);
                userAccount.accountbalance = addTransaction.senderbalanceamount;
                entity.SaveChanges();
            }
            return Ok(addTransaction);
        }


        [HttpPost]
        public IHttpActionResult IssueCheckBook(CheckbookDto checkbookDto)
        {
            checkbook addCheckbook = new checkbook
            {
                usersaccountnumber = checkbookDto.usersAccountNumber,
                issuedate = DateTime.Now,
                numberofpages = checkbookDto.numberOfPages,
                delivereddate = DateTime.Now.AddDays(7),
                isdelivered = false
            };

            entity.checkbooks.Add(addCheckbook);
            entity.SaveChanges();
            return Ok(addCheckbook);
        }

        [HttpPost]
        public IHttpActionResult UpdateCheckBookDeliveryStatus(CheckbookDto checkbookDto)
        {
            var checkBook = entity.checkbooks.First(x => x.usersaccountnumber == checkbookDto.usersAccountNumber);
            checkBook.isdelivered = checkbookDto.status;
            entity.SaveChanges();
            return Ok(checkBook);
        }


        [HttpGet]
        public IHttpActionResult ViewIssuedCheckBook(string accountNumber)
        {
            var checkBook = entity.checkbooks.Where(x => x.usersaccountnumber == accountNumber).ToList();
            return Ok(checkBook);
        }


        [HttpPost]
        public IHttpActionResult ApplyBankServices(ServicesDto servicesDto)
        {
            bankservice addBankService = null;
            try
            {
                addBankService = entity.bankservices.First(x => x.usersaccountnumber == servicesDto.usersAccountNumber);
                addBankService.services = servicesDto.services;
                entity.SaveChanges();
                return Ok(addBankService);

            }
            catch (Exception ex)
            {
                addBankService = new bankservice
                {
                    usersaccountnumber = servicesDto.usersAccountNumber,
                    services = servicesDto.services
                };
                entity.bankservices.Add(addBankService);
                entity.SaveChanges();
                return Ok(addBankService);
            }
        }

        [HttpGet]
        public IHttpActionResult ViewAppliedBankService(string accountNumber)
        {
            var bankservices = entity.bankservices.Where(x => x.usersaccountnumber == accountNumber).ToList();
            return Ok(bankservices);
        }



        [HttpGet]
        public IHttpActionResult GetTransactions(string accountNumber, string startDate, string endDate)
        {
            DateTime startDateTime = Convert.ToDateTime(startDate);
            DateTime endDateTime = Convert.ToDateTime(endDate);
            var record = (from log in entity.transactions
                          where (EntityFunctions.TruncateTime(log.transactiondate) >= EntityFunctions.TruncateTime(startDateTime.Date)
                          && EntityFunctions.TruncateTime(log.transactiondate) <= EntityFunctions.TruncateTime(endDateTime.Date))
                          && ((log.senderaccountnumber == accountNumber && log.senderaccountnumber != "" && log.receiveraccountnumber != "") || (log.receiveraccountnumber == accountNumber && log.receiveraccountnumber != "" && log.senderaccountnumber != ""))
                          select log);
            return Ok(record);
        }

        [HttpGet]
        public IHttpActionResult GetLastTenTransactions(string accountNumber)
        {
            var record = (from log in entity.transactions
                          where (log.senderaccountnumber == accountNumber && log.senderaccountnumber != "" && log.receiveraccountnumber != "") || (log.receiveraccountnumber == accountNumber && log.receiveraccountnumber != "" && log.senderaccountnumber != "")
                          orderby EntityFunctions.TruncateTime(log.transactiondate)
                          select log);

            return Ok(record);
        }

        [HttpGet]
        public IHttpActionResult GetFinalLastTenTransactions(string accountNumber)
        {
            var record = (from log in entity.transactions
                          where (log.senderaccountnumber == accountNumber && log.senderaccountnumber != "" && log.receiveraccountnumber != "") || (log.receiveraccountnumber == accountNumber && log.receiveraccountnumber != "" && log.senderaccountnumber != "")
                          orderby log.id descending
                          select log).Take(10);

            //var res = record.Take(10);
            return Ok(record);
        }




        //Here code for the admin section.

        [HttpPost]
        public IHttpActionResult AdminLogin(AdminUsersDto adminUsersDto)
        {
            var record = entity.adminusers.Where(x => x.username == adminUsersDto.userName && x.password == adminUsersDto.password).ToList();
            return Ok(record.Count);
        }

        [HttpGet]
        public IHttpActionResult GetAccountDetail(string type )
        {
            accountdetail accountDetail = null;
            try
            {
                accountDetail = entity.accountdetails.Where(x => x.type == type).First();
                return Ok(accountDetail);
            }
            catch (Exception ex)
            {
                return Ok(accountDetail);
            }
        }


        [HttpPost]
        public IHttpActionResult AccountDetail(AccountDetailDto accountDetailDto)
        {
            try
            {
                var accountDetail = entity.accountdetails.Where(x => x.type == accountDetailDto.type).First();
                accountDetail.title = accountDetailDto.title;
                accountDetail.para1 = accountDetailDto.para1;
                accountDetail.para2 = accountDetailDto.para2;
                accountDetail.heading = accountDetailDto.heading;
                entity.SaveChanges();
                return Ok(accountDetail);
            }
            catch (Exception ex)
            {
                var accountDetail = new accountdetail
                {
                    type = accountDetailDto.type,
                    title = accountDetailDto.title,
                    para1 = accountDetailDto.para1,
                    para2 = accountDetailDto.para2,
                    heading = accountDetailDto.heading
                };

                entity.accountdetails.Add(accountDetail);
                entity.SaveChanges();
                return Ok(accountDetail);
            }
        }


        [HttpPost]
        public IHttpActionResult AccountDetailPanel1(AccountDetailPanel1Dto accountDetailPanel1Dto)
        {
            try
            {
                var accountDetail = entity.accountdetails.Where(x => x.type == accountDetailPanel1Dto.type).First();
                accountDetail.panel1title = accountDetailPanel1Dto.panel1Title;

                accountDetail.panel1subtitle1 = accountDetailPanel1Dto.panel1Subtitle1;
                accountDetail.panel1subtitle1content = accountDetailPanel1Dto.panel1Subtitle1Content;

                accountDetail.panel1subtitle2 = accountDetailPanel1Dto.panel1Subtitle2;
                accountDetail.panel1subtitle2content = accountDetailPanel1Dto.panel1Subtitle2Content;

                accountDetail.panel1subtitle3 = accountDetailPanel1Dto.panel1Subtitle3;
                accountDetail.panel1subtitle3content = accountDetailPanel1Dto.panel1Subtitle3Content;

                entity.SaveChanges();
                return Ok(accountDetail);
            }
            catch (Exception ex)
            {
                var accountDetail = new accountdetail
                {
                    type = accountDetailPanel1Dto.type,

                    panel1title = accountDetailPanel1Dto.panel1Title,

                    panel1subtitle1 = accountDetailPanel1Dto.panel1Subtitle1,
                    panel1subtitle1content = accountDetailPanel1Dto.panel1Subtitle1Content,

                    panel1subtitle2 = accountDetailPanel1Dto.panel1Subtitle2,
                    panel1subtitle2content = accountDetailPanel1Dto.panel1Subtitle2Content,

                    panel1subtitle3 = accountDetailPanel1Dto.panel1Subtitle3,
                    panel1subtitle3content = accountDetailPanel1Dto.panel1Subtitle3Content
            };

                entity.accountdetails.Add(accountDetail);
                entity.SaveChanges();
                return Ok(accountDetail);
            }
        }


        [HttpPost]
        public IHttpActionResult AccountDetailPanel2(AccountDetailPanel2Dto accountDetailPanel1Dto)
        {
            try
            {
                var accountDetail = entity.accountdetails.Where(x => x.type == accountDetailPanel1Dto.type).First();
                accountDetail.panel2title = accountDetailPanel1Dto.panel2Title;

                accountDetail.panel2subtitle1 = accountDetailPanel1Dto.panel2Subtitle1;
                accountDetail.panel2subtitle1content = accountDetailPanel1Dto.panel2Subtitle1Content;

                accountDetail.panel2subtitle2 = accountDetailPanel1Dto.panel2Subtitle2;
                accountDetail.panel2subtitle2content = accountDetailPanel1Dto.panel2Subtitle2Content;

                accountDetail.panel2subtitle3 = accountDetailPanel1Dto.panel2Subtitle3;
                accountDetail.panel2subtitle3content = accountDetailPanel1Dto.panel2Subtitle3Content;

                entity.SaveChanges();
                return Ok(accountDetail);
            }
            catch (Exception ex)
            {
                var accountDetail = new accountdetail
                {
                    type = accountDetailPanel1Dto.type,

                    panel2title = accountDetailPanel1Dto.panel2Title,

                    panel2subtitle1 = accountDetailPanel1Dto.panel2Subtitle1,
                    panel2subtitle1content = accountDetailPanel1Dto.panel2Subtitle1Content,

                    panel2subtitle2 = accountDetailPanel1Dto.panel2Subtitle2,
                    panel2subtitle2content = accountDetailPanel1Dto.panel2Subtitle2Content,

                    panel2subtitle3 = accountDetailPanel1Dto.panel2Subtitle3,
                    panel2subtitle3content = accountDetailPanel1Dto.panel2Subtitle3Content
                };

                entity.accountdetails.Add(accountDetail);
                entity.SaveChanges();
                return Ok(accountDetail);
            }
        }


        [HttpPost]
        public IHttpActionResult AccountDetailPanel3(AccountDetailPanel3Dto accountDetailPanel1Dto)
        {
            try
            {
                var accountDetail = entity.accountdetails.Where(x => x.type == accountDetailPanel1Dto.type).First();
                accountDetail.panel3title = accountDetailPanel1Dto.panel3Title;

                accountDetail.panel3subtitle1 = accountDetailPanel1Dto.panel3Subtitle1;
                accountDetail.panel3subtitle1content = accountDetailPanel1Dto.panel3Subtitle1Content;

                accountDetail.panel3subtitle2 = accountDetailPanel1Dto.panel3Subtitle2;
                accountDetail.panel3subtitle2content = accountDetailPanel1Dto.panel3Subtitle2Content;

                accountDetail.panel3subtitle3 = accountDetailPanel1Dto.panel3Subtitle3;
                accountDetail.panel3subtitle3content = accountDetailPanel1Dto.panel3Subtitle3Content;

                entity.SaveChanges();
                return Ok(accountDetail);
            }
            catch (Exception ex)
            {
                var accountDetail = new accountdetail
                {
                    type = accountDetailPanel1Dto.type,

                    panel3title = accountDetailPanel1Dto.panel3Title,

                    panel3subtitle1 = accountDetailPanel1Dto.panel3Subtitle1,
                    panel3subtitle1content = accountDetailPanel1Dto.panel3Subtitle1Content,

                    panel3subtitle2 = accountDetailPanel1Dto.panel3Subtitle2,
                    panel3subtitle2content = accountDetailPanel1Dto.panel3Subtitle2Content,

                    panel3subtitle3 = accountDetailPanel1Dto.panel3Subtitle3,
                    panel3subtitle3content = accountDetailPanel1Dto.panel3Subtitle3Content
                };

                entity.accountdetails.Add(accountDetail);
                entity.SaveChanges();
                return Ok(accountDetail);
            }
        }


        [HttpPost]
        public IHttpActionResult AccountDetailPanel4(AccountDetailPanel4Dto accountDetailPanel1Dto)
        {
            try
            {
                var accountDetail = entity.accountdetails.Where(x => x.type == accountDetailPanel1Dto.type).First();
                accountDetail.panel4title = accountDetailPanel1Dto.panel4Title;

                accountDetail.panel4subtitle1 = accountDetailPanel1Dto.panel4Subtitle1;
                accountDetail.panel4subtitle1content = accountDetailPanel1Dto.panel4Subtitle1Content;

                accountDetail.panel4subtitle2 = accountDetailPanel1Dto.panel4Subtitle2;
                accountDetail.panel4subtitle2content = accountDetailPanel1Dto.panel4Subtitle2Content;

                accountDetail.panel4subtitle3 = accountDetailPanel1Dto.panel4Subtitle3;
                accountDetail.panel4subtitle3content = accountDetailPanel1Dto.panel4Subtitle3Content;

                entity.SaveChanges();
                return Ok(accountDetail);
            }
            catch (Exception ex)
            {
                var accountDetail = new accountdetail
                {
                    type = accountDetailPanel1Dto.type,

                    panel4title = accountDetailPanel1Dto.panel4Title,

                    panel4subtitle1 = accountDetailPanel1Dto.panel4Subtitle1,
                    panel4subtitle1content = accountDetailPanel1Dto.panel4Subtitle1Content,

                    panel4subtitle2 = accountDetailPanel1Dto.panel4Subtitle2,
                    panel4subtitle2content = accountDetailPanel1Dto.panel4Subtitle2Content,

                    panel4subtitle3 = accountDetailPanel1Dto.panel4Subtitle3,
                    panel4subtitle3content = accountDetailPanel1Dto.panel4Subtitle3Content
                };

                entity.accountdetails.Add(accountDetail);
                entity.SaveChanges();
                return Ok(accountDetail);
            }
        }


        [HttpPost]
        public IHttpActionResult AccountDetailPanel5(AccountDetailPanel5Dto accountDetailPanel1Dto)
        {
            try
            {
                var accountDetail = entity.accountdetails.Where(x => x.type == accountDetailPanel1Dto.type).First();
                accountDetail.panel5title = accountDetailPanel1Dto.panel5Title;

                accountDetail.panel5subtitle1 = accountDetailPanel1Dto.panel5Subtitle1;
                accountDetail.panel5subtitle1content = accountDetailPanel1Dto.panel5Subtitle1Content;

                accountDetail.panel5subtitle2 = accountDetailPanel1Dto.panel5Subtitle2;
                accountDetail.panel5subtitle2content = accountDetailPanel1Dto.panel5Subtitle2Content;

                accountDetail.panel5subtitle3 = accountDetailPanel1Dto.panel5Subtitle3;
                accountDetail.panel5subtitle3content = accountDetailPanel1Dto.panel5Subtitle3Content;

                entity.SaveChanges();
                return Ok(accountDetail);
            }
            catch (Exception ex)
            {
                var accountDetail = new accountdetail
                {
                    type = accountDetailPanel1Dto.type,

                    panel5title = accountDetailPanel1Dto.panel5Title,

                    panel5subtitle1 = accountDetailPanel1Dto.panel5Subtitle1,
                    panel5subtitle1content = accountDetailPanel1Dto.panel5Subtitle1Content,

                    panel5subtitle2 = accountDetailPanel1Dto.panel5Subtitle2,
                    panel5subtitle2content = accountDetailPanel1Dto.panel5Subtitle2Content,

                    panel5subtitle3 = accountDetailPanel1Dto.panel5Subtitle3,
                    panel5subtitle3content = accountDetailPanel1Dto.panel5Subtitle3Content
                };

                entity.accountdetails.Add(accountDetail);
                entity.SaveChanges();
                return Ok(accountDetail);
            }
        }


        [HttpPost]
        public IHttpActionResult AccountDetailPanel6(AccountDetailPanel6Dto accountDetailPanel1Dto)
        {
            try
            {
                var accountDetail = entity.accountdetails.Where(x => x.type == accountDetailPanel1Dto.type).First();
                accountDetail.panel6title = accountDetailPanel1Dto.panel6Title;

                accountDetail.panel6subtitle1 = accountDetailPanel1Dto.panel6Subtitle1;
                accountDetail.panel6subtitle1content = accountDetailPanel1Dto.panel6Subtitle1Content;

                accountDetail.panel6subtitle2 = accountDetailPanel1Dto.panel6Subtitle2;
                accountDetail.panel6subtitle2content = accountDetailPanel1Dto.panel6Subtitle2Content;

                accountDetail.panel6subtitle3 = accountDetailPanel1Dto.panel6Subtitle3;
                accountDetail.panel6subtitle3content = accountDetailPanel1Dto.panel6Subtitle3Content;

                entity.SaveChanges();
                return Ok(accountDetail);
            }
            catch (Exception ex)
            {
                var accountDetail = new accountdetail
                {
                    type = accountDetailPanel1Dto.type,

                    panel6title = accountDetailPanel1Dto.panel6Title,

                    panel6subtitle1 = accountDetailPanel1Dto.panel6Subtitle1,
                    panel6subtitle1content = accountDetailPanel1Dto.panel6Subtitle1Content,

                    panel6subtitle2 = accountDetailPanel1Dto.panel6Subtitle2,
                    panel6subtitle2content = accountDetailPanel1Dto.panel6Subtitle2Content,

                    panel6subtitle3 = accountDetailPanel1Dto.panel6Subtitle3,
                    panel6subtitle3content = accountDetailPanel1Dto.panel6Subtitle3Content
                };

                entity.accountdetails.Add(accountDetail);
                entity.SaveChanges();
                return Ok(accountDetail);
            }
        }

    }
}
