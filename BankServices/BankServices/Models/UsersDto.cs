using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BankServices.Models
{
    public class UsersDto
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string newPassword { get; set; }
        public string transactionPassword { get; set; }
        public string newTransactionPassword { get; set; }
        public string holderName { get; set; }
        public string accountNumber { get; set; }
        public DateTime createdOn { get; set; }
        public string image { get; set; }
        public string contactNumber { get; set; }
        public string email { get; set; }
        public DateTime lastLogin { get; set; }
        public string location { get; set; }
        public string gender { get; set; }
        public DateTime dateofbirth { get; set; }
        public string randomText { get; set; }

    }
}