using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EBankingMain.Models
{
    public class TransactionsDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public string nickName { get; set; }
        public string senderaccountnumber { get; set; }
        public string receiveraccountnumber { get; set; }
        public string ifscCode { get; set; }
        public DateTime transactiondate { get; set; }
        public string creditamount { get; set; }
        public string debitamount { get; set; }
    }
}