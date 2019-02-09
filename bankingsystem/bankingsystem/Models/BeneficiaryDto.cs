using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EBankingMain.Models
{
    public class BeneficiaryDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public string nickName { get; set; }
        public string accountNumber { get; set; }
        public string ifscCode { get; set; }
        public string maxAmount { get; set; }
        public string maxTransactions { get; set; }
        public string address { get; set; }
        public string usersAccountNumber { get; set; }
    }
}