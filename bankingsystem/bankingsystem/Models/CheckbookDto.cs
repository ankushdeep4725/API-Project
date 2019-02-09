using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EBankingMain.Models
{
    public class CheckbookDto
    {
        public int id { get; set; }
        public string usersAccountNumber { get; set; }
        public DateTime issueDate { get; set; }
        public DateTime deliveredDate { get; set; }
        public Boolean isDelivered { get; set; }
        public string numberOfPages { get; set; }
        public Boolean status { get; set; }
    }
}