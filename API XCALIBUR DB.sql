USE [master]
GO
/****** Object:  Database [ebanking]    Script Date: 02/08/2019 8:28:22 PM ******/
CREATE DATABASE [ebanking] ON  PRIMARY 
( NAME = N'ebanking', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\ebanking.mdf' , SIZE = 2048KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ebanking_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\ebanking_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ebanking] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ebanking].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ebanking] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ebanking] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ebanking] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ebanking] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ebanking] SET ARITHABORT OFF 
GO
ALTER DATABASE [ebanking] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ebanking] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [ebanking] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ebanking] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ebanking] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ebanking] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ebanking] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ebanking] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ebanking] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ebanking] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ebanking] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ebanking] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ebanking] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ebanking] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ebanking] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ebanking] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ebanking] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ebanking] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ebanking] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ebanking] SET  MULTI_USER 
GO
ALTER DATABASE [ebanking] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ebanking] SET DB_CHAINING OFF 
GO
USE [ebanking]
GO
/****** Object:  Table [dbo].[accountdetails]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[accountdetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type] [varchar](50) NULL,
	[title] [varchar](100) NULL,
	[para1] [varchar](5000) NULL,
	[para2] [varchar](5000) NULL,
	[heading] [varchar](200) NULL,
	[panel1title] [varchar](100) NULL,
	[panel1subtitle1] [varchar](100) NULL,
	[panel1subtitle1content] [varchar](5000) NULL,
	[panel1subtitle2] [varchar](100) NULL,
	[panel1subtitle2content] [varchar](5000) NULL,
	[panel1subtitle3] [varchar](100) NULL,
	[panel1subtitle3content] [varchar](5000) NULL,
	[panel2title] [varchar](100) NULL,
	[panel2subtitle1] [varchar](100) NULL,
	[panel2subtitle1content] [varchar](5000) NULL,
	[panel2subtitle2] [varchar](100) NULL,
	[panel2subtitle2content] [varchar](5000) NULL,
	[panel2subtitle3] [varchar](100) NULL,
	[panel2subtitle3content] [varchar](5000) NULL,
	[panel3title] [varchar](100) NULL,
	[panel3subtitle1] [varchar](100) NULL,
	[panel3subtitle1content] [varchar](5000) NULL,
	[panel3subtitle2] [varchar](100) NULL,
	[panel3subtitle2content] [varchar](5000) NULL,
	[panel3subtitle3] [varchar](100) NULL,
	[panel3subtitle3content] [varchar](5000) NULL,
	[panel4title] [varchar](100) NULL,
	[panel4subtitle1] [varchar](100) NULL,
	[panel4subtitle1content] [varchar](5000) NULL,
	[panel4subtitle2] [varchar](100) NULL,
	[panel4subtitle2content] [varchar](5000) NULL,
	[panel4subtitle3] [varchar](100) NULL,
	[panel4subtitle3content] [varchar](5000) NULL,
	[panel5title] [varchar](100) NULL,
	[panel5subtitle1] [varchar](100) NULL,
	[panel5subtitle1content] [varchar](5000) NULL,
	[panel5subtitle2] [varchar](100) NULL,
	[panel5subtitle2content] [varchar](5000) NULL,
	[panel5subtitle3] [varchar](100) NULL,
	[panel5subtitle3content] [varchar](5000) NULL,
	[panel6title] [varchar](100) NULL,
	[panel6subtitle1] [varchar](100) NULL,
	[panel6subtitle1content] [varchar](5000) NULL,
	[panel6subtitle2] [varchar](100) NULL,
	[panel6subtitle2content] [varchar](5000) NULL,
	[panel6subtitle3] [varchar](100) NULL,
	[panel6subtitle3content] [varchar](5000) NULL,
 CONSTRAINT [PK_accountdetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[accounts]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[accounts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[accounttype] [varchar](500) NULL,
	[accountdesc1] [varchar](5000) NULL,
	[accountdesc2] [varchar](5000) NULL,
 CONSTRAINT [PK_accounts] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[accountsuboptions]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[accountsuboptions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[accountsubject] [varchar](100) NULL,
	[title] [varchar](100) NULL,
	[optiontitle1] [varchar](100) NULL,
	[optiondesc1] [varchar](5000) NULL,
	[optiontitle2] [varchar](100) NULL,
	[optiondesc2] [varchar](5000) NULL,
	[optiontitle3] [varchar](100) NULL,
	[optiondesc3] [varchar](5000) NULL,
	[accounttypename] [varchar](100) NULL,
 CONSTRAINT [PK_accountsuboptions] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[adminuser]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[adminuser](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NULL,
	[password] [varchar](50) NULL,
 CONSTRAINT [PK_adminuser] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bankservices]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bankservices](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usersaccountnumber] [varchar](50) NULL,
	[services] [varchar](1000) NULL,
 CONSTRAINT [PK_bankservices] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[beneficiaries]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[beneficiaries](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[nickname] [varchar](50) NULL,
	[accountnumber] [varchar](50) NULL,
	[ifsccode] [varchar](50) NULL,
	[maxamount] [varchar](50) NULL,
	[maxtransactions] [varchar](50) NULL,
	[address] [varchar](50) NULL,
	[usersaccountnumber] [varchar](50) NULL,
 CONSTRAINT [PK_beneficiaries] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[checkbooks]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[checkbooks](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usersaccountnumber] [varchar](50) NULL,
	[issuedate] [datetime] NULL,
	[numberofpages] [varchar](50) NULL,
	[delivereddate] [datetime] NULL,
	[isdelivered] [bit] NULL,
 CONSTRAINT [PK_checkbooks] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[faq]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[faq](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[question] [varchar](1000) NULL,
	[answer] [varchar](1000) NULL,
 CONSTRAINT [PK_faq] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[transactions]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[transactions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[nickname] [varchar](50) NULL,
	[senderaccountnumber] [varchar](50) NULL,
	[receiveraccountnumber] [varchar](50) NULL,
	[ifsccode] [varchar](50) NULL,
	[transactiondate] [datetime] NULL,
	[creditamount] [varchar](50) NULL,
	[debitamount] [varchar](50) NULL,
	[senderbalanceamount] [varchar](50) NULL,
	[receiverbalanceamount] [varchar](50) NULL,
 CONSTRAINT [PK_transactions] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[users]    Script Date: 02/08/2019 8:28:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[firstname] [varchar](50) NULL,
	[lastname] [varchar](50) NULL,
	[username] [varchar](50) NULL,
	[password] [varchar](50) NULL,
	[transactionpassword] [varchar](50) NULL,
	[holdername] [varchar](50) NULL,
	[accountnumber] [varchar](50) NULL,
	[createdon] [datetime] NULL,
	[image] [varchar](1000) NULL,
	[contactnumber] [varchar](50) NULL,
	[email] [varchar](50) NULL,
	[lastlogin] [datetime] NULL,
	[location] [varchar](500) NULL,
	[gender] [varchar](50) NULL,
	[dateofbirth] [varchar](50) NULL,
	[accountbalance] [varchar](50) NULL,
	[randomtext] [varchar](50) NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[accountdetails] ON 

INSERT [dbo].[accountdetails] ([id], [type], [title], [para1], [para2], [heading], [panel1title], [panel1subtitle1], [panel1subtitle1content], [panel1subtitle2], [panel1subtitle2content], [panel1subtitle3], [panel1subtitle3content], [panel2title], [panel2subtitle1], [panel2subtitle1content], [panel2subtitle2], [panel2subtitle2content], [panel2subtitle3], [panel2subtitle3content], [panel3title], [panel3subtitle1], [panel3subtitle1content], [panel3subtitle2], [panel3subtitle2content], [panel3subtitle3], [panel3subtitle3content], [panel4title], [panel4subtitle1], [panel4subtitle1content], [panel4subtitle2], [panel4subtitle2content], [panel4subtitle3], [panel4subtitle3content], [panel5title], [panel5subtitle1], [panel5subtitle1content], [panel5subtitle2], [panel5subtitle2content], [panel5subtitle3], [panel5subtitle3content], [panel6title], [panel6subtitle1], [panel6subtitle1content], [panel6subtitle2], [panel6subtitle2content], [panel6subtitle3], [panel6subtitle3content]) VALUES (6, N'SALARY', N'Salary Accountl', N'Xcalibur Salary Accounts offer employees seamless and convenient access to their salaries. Open a Salary Account that is most appropriate for your employees'' job profiles and let them enjoy a myriad of added benefits, including special debit cards. Help your employees to conveniently keep a tab on their salary and reimbursements.', N'There are 6 different kinds of salary accounts depending on the nature of work. The accounts differ in various ways like the daily withdrawal limit, shopping limit, kind of debit card and so on. The special employee delights and added benefits are what makes our Bank Salary Accounts the best in class. Benefits ranging from Senior ID cards for senior citizens, domestic travel plans and higher interests to dining delights, cashback on movie tickets, etc. are provided to different salary bank accounts. Priority Salary Account holders are in for special treats while defence personnel have special privileges as well. Get the complete list of all these specialised benefits and open a Salary Account that best suits your employees'' needs.', N'Salary Accounts Varients', N'Republic Salary Account', N'Debit Card', N'Free Platinum Debit Card With Shopping Limit Of $1 Lakh', N'Product Features', N'Senior ID Card For Senior Citizen Parents To Avail The Account.', N'Offers & Discounts', N'Domestic Travel Offers On Accounts And Free Online Booking Offers.', N'Easy Access Salary Account', N'Debit Card', N'Platinum Debit Card Daily Shopping Limit: $ 1 Lakh', N'Product Features', N'Dining Delights Program Available With Special Discounts.', N'Offers & Discounts', N'No Offers & Discounts Available, You Will Be Notified Soon.', N'Prime Salary Account', N'Debit Card', N'Visa Rewards Plus Debit Card Daily Shopping Limit: $ 4 Lakh', N'Product Features', N'Dining Delights Program Available With 50% Cashback', N'Offers & Discounts', N'5% Cashback On Movie Ticket Spends On This Account', N'Priority Salary Account', N'Debit Card', N'Free Priority Platinum Debit Card Daily Shopping Limit: $ 4 Lakh', N'Product Features', N'Dining Delights Program Available On This Account.', N'Offers & Discounts', N'25% Cashback On Movie Ticket Spends On This Account.', N'Defence Salary Account', N'Debit Card', N'Free Power Salute Debit Card Daily Shopping Limit-$1 Lakh', N'Product Features', N'Dining Delights Program & Free Insurance Available On This Account.', N'Offers & Discounts', N'Xcalibur Reward Points Offers On This Account.', N'Employee Reimbursement A/c.', N'Debit Card', N'Open The Account Simultaneously With A Salary Account', N'Product Features', N'Track Reimbursements Separately On This Account', N'Offers & Discounts', N'3.5% Interest On Daily Balances For This Account.')
INSERT [dbo].[accountdetails] ([id], [type], [title], [para1], [para2], [heading], [panel1title], [panel1subtitle1], [panel1subtitle1content], [panel1subtitle2], [panel1subtitle2content], [panel1subtitle3], [panel1subtitle3content], [panel2title], [panel2subtitle1], [panel2subtitle1content], [panel2subtitle2], [panel2subtitle2content], [panel2subtitle3], [panel2subtitle3content], [panel3title], [panel3subtitle1], [panel3subtitle1content], [panel3subtitle2], [panel3subtitle2content], [panel3subtitle3], [panel3subtitle3content], [panel4title], [panel4subtitle1], [panel4subtitle1content], [panel4subtitle2], [panel4subtitle2content], [panel4subtitle3], [panel4subtitle3content], [panel5title], [panel5subtitle1], [panel5subtitle1content], [panel5subtitle2], [panel5subtitle2content], [panel5subtitle3], [panel5subtitle3content], [panel6title], [panel6subtitle1], [panel6subtitle1content], [panel6subtitle2], [panel6subtitle2content], [panel6subtitle3], [panel6subtitle3content]) VALUES (7, N'CURRENT', N'Current Account 9', N'Xcalibur Current Account offers to carry out as many withdrawals and deposits as you need, with current accounts that suit your business', N'There are 6 different kinds of current accounts depending on the nature of work. The accounts differ in various ways like the daily withdrawal limit, shopping limit, kind of debit card and so on. The special employee delights and added benefits are what makes our Bank Current Accounts the best in class. Benefits ranging from Senior ID cards for senior citizens, domestic travel plans and higher interests to dining delights, cashback on movie tickets, etc. are provided to different current bank accounts. Priority Current Account holders are in for special treats while defence personnel have special privileges as well. Get the complete list of all these specialised benefits and open a Current Account that best suits your employees'' needs.', N'Current Accounts Varients', N'Prime Current Account 88', N'Debit Card', N'Unlimited Cash Withdrawal Limit For Home Branch And Upto $3 Lakhs/Month For Non Home Branch', N'Product Features', N'Fixed Charge Of $50 Per Month With Unlimited Transactions.', N'Offers & Discounts', N'Upto $2 Lakhs Per Month For Home And Non Home Branch Cash Deposit', N'Priority Current Account', N'Debit Card', N'$25 Lakhs Per Month Cash Withdrawal Limit In This Account.', N'Product Features', N'Unlimited Free Transactions In This Account As Per Bank Norms.', N'Offers & Discounts', N'No Offers & Discounts Available, You Will Be Notified Soon.', N'Wealth Current Account', N'Debit Card', N'Unlimited Cash Withdrawal Limit For Home Branch As Well As Non Home Branch.', N'Product Features', N'Unlimited Free Transactions In This Account As Per Terms & Conditions.', N'Offers & Discounts', N'Upto $2 Crores Per Month Across Any Xcalibur Bank Branch.', N'Current Industry Account', N'Debit Card', N'Remote Pay-Outs Available In This Account As Per Terms & Conditions.', N'Product Features', N'Availabe For Trading In Government And Corporate Securities.', N'Offers & Discounts', N'Availabe For Trading In Government And Corporate Securities', N'Tailor Made Current Account', N'Debit Card', N'Decide The Average Balance To Be Maintained In Your Account', N'Product Features', N'Design Cash Management Services Based On Your Requirements', N'Offers & Discounts', N'Customized Business Debit Card To Include Your Company Name.', N'Resident Foreign Curr. A/c.', N'Debit Card', N'Non-Interest Bearing Available In This Account As Per Norms.', N'Product Features', N'Currencies Applicable Are USD, EURO, GBP And Japanese Yen.', N'Offers & Discounts', N'Three Maximum USD 2000 By It''s Residents For A Particular Time Bound.')
INSERT [dbo].[accountdetails] ([id], [type], [title], [para1], [para2], [heading], [panel1title], [panel1subtitle1], [panel1subtitle1content], [panel1subtitle2], [panel1subtitle2content], [panel1subtitle3], [panel1subtitle3content], [panel2title], [panel2subtitle1], [panel2subtitle1content], [panel2subtitle2], [panel2subtitle2content], [panel2subtitle3], [panel2subtitle3content], [panel3title], [panel3subtitle1], [panel3subtitle1content], [panel3subtitle2], [panel3subtitle2content], [panel3subtitle3], [panel3subtitle3content], [panel4title], [panel4subtitle1], [panel4subtitle1content], [panel4subtitle2], [panel4subtitle2content], [panel4subtitle3], [panel4subtitle3content], [panel5title], [panel5subtitle1], [panel5subtitle1content], [panel5subtitle2], [panel5subtitle2content], [panel5subtitle3], [panel5subtitle3content], [panel6title], [panel6subtitle1], [panel6subtitle1content], [panel6subtitle2], [panel6subtitle2content], [panel6subtitle3], [panel6subtitle3content]) VALUES (8, N'SAVING', N'Savings Account', N'Xcalibur bank provides its customers with an option to choose from a wide range of savings accounts with different features and debit card options. Each savings account comes with a plethora of offers and discounts. There are special savings accounts for women, senior citizens and younger ones. Our bank also provides accounts designed to meet the banking needs of people from all walks of life. Perks like zero balance facility are provided by basic savings account.', N'Each online savings account is uniquely built with features like high transaction limits, free cheque books and etc. Offers and discounts range from free subscriptions, discounted movie tickets, rewards to emergency travel allowances and a lot more. Apply for savings account to enjoy all those features, offers and discounts. A detailed description of various bank savings accounts is provided here.', N'Customised For Individual Needs', N'ASAP Instant Savings Account', N'Debit Card', N'Virtual Visa Debit Card Online Daily Purchase Limit Of $ 1,00,000', N'Product features', N'No Minimum Bal. Requirement Higher Interest Rate On Balances Above $ 10,000', N'Offers & Discounts', N'$150 Off On BookMyShow 20% Off On BigBasket', N'EasyAccess Savings Account', N'Debit Card', N'Platinum Debit Card Daily ATM Withdrawal Limit Of $ 40,000', N'Product features', N'1 Cheque Book Free Per Quarter First 4 Trans. Or $3 Lakhs Whichever Is Earlier.', N'Offers & Discounts', N'Minimum 15%* Off At All Our Partner Restaurants', N'Prime Plus Savings Account', N'Debit Card', N'Visa Titanium Prime Plus Debit Card Daily ATM Withdrawal Limit Of $ 50,000', N'Product features', N'2 Cheque Books Free Per Quarter 20 Free Branch Trans. Per Month', N'Offers & Discounts', N'10% Cash-Back On Movie Tickets Earn Up To 180 Reward Points Annually', N'Future Stars Savings Account', N'Debit Card', N'Visa Classic Debit Card Daily ATM Withdrawal Limit Of $ 1,500', N'Product features', N'1 Cheque Book Free Per Quarter First 4 Trans. Or Rs. 3 Lakhs Whichever Is Earlier.', N'Offers & Discounts', N'Personalised Image Debit CardFree ATM Card For Children Under 10 Years Of Age', N'Pension Savings Account', N'Debit Card', N'Visa Classic Debit Card Daily ATM Withdrawal Limit Of $ 40,000', N'Product features', N'Free & Unlimited Multi City Cheque Books & Zero Charges On Insuance', N'Offers & Discounts', N'No Offers & Discounts Available, You Will Be Notified Soon.', N'Basic Savings Account', N'Debit Card', N'Debit Card Daily ATM Withdrawal Limit Of $ 40,000', N'Product features', N'Free Unlimited Cash Deposit & 4 Free Withdrawals Per Month', N'Offers & Discounts', N'No Offers & Discounts Available, You Will Be Notified Soon.')
INSERT [dbo].[accountdetails] ([id], [type], [title], [para1], [para2], [heading], [panel1title], [panel1subtitle1], [panel1subtitle1content], [panel1subtitle2], [panel1subtitle2content], [panel1subtitle3], [panel1subtitle3content], [panel2title], [panel2subtitle1], [panel2subtitle1content], [panel2subtitle2], [panel2subtitle2content], [panel2subtitle3], [panel2subtitle3content], [panel3title], [panel3subtitle1], [panel3subtitle1content], [panel3subtitle2], [panel3subtitle2content], [panel3subtitle3], [panel3subtitle3content], [panel4title], [panel4subtitle1], [panel4subtitle1content], [panel4subtitle2], [panel4subtitle2content], [panel4subtitle3], [panel4subtitle3content], [panel5title], [panel5subtitle1], [panel5subtitle1content], [panel5subtitle2], [panel5subtitle2content], [panel5subtitle3], [panel5subtitle3content], [panel6title], [panel6subtitle1], [panel6subtitle1content], [panel6subtitle2], [panel6subtitle2content], [panel6subtitle3], [panel6subtitle3content]) VALUES (9, N'SAFEDEPOSIT', N'Safe Deposit Lockers', N'Looking for a way to keep your valuables safe? With Xcalibur Bank safe deposit Lockers you can now ensure safety of your valuables.', N'The Safe Deposit Locker benefits include convenient locker rent payment options and nomination for hassle free release of locker contents. Our lockers come in various sizes and locker facilities are available in over 2,000 branches. Get your own Safe Deposit Locker now!', N'6 BENEFITS OF SAFE DEPOSIT LOCKERS', N'Easy Booking from Anywhere', N'Debit Card', N'Enjoy Locker Facility In Over 2,000 Branches All Over The Country.', N'Product Features', N'Add A Nominee To Your Safe Deposit Locker To Facilitate The Release Of Contents.', N'Offers & Discounts', N'Enjoy Competitive Rentals Charged On The Basis Of Locker Location And Size.', N'Choose locker as per your needs', N'Debit Card', N'Choose From Small, Medium, Large, Extra-Large Locker Sizes With This Service.', N'Product Features', N'Facility To Pay Outstanding Locker Rent Charges Conveniently.', N'Offers & Discounts', N'Release Of Contents To The Nominee(S) Of The Hirer(S) As And When Required.', N'Direct debit of locker rent from A/c.', N'Debit Card', N'Make Hassle-Free, Direct Debits From Your A/C. To Pay Your Locker Rent.', N'Product Features', N'Enjoy Competitive Rentals Charged On The Basis Of Locker Location And Size.', N'Offers & Discounts', N'Pay Your Locker Rent Charged Annually And Payable In Advance.', N'Authorised Centres', N'Debit Card', N'Debit Card Available At All Our Authorised Centres Of Xcalibur Bank.', N'Product Features', N'If You Are Eligible For Opening The Safe Deposit Locker, Get It Now.', N'Offers & Discounts', N'Comprehensive List Of Authorised Centres For Safe Deposit Locker Availability.', N'Digital Security Certificate', N'Debit Card', N'Our Major Requisites For The Customers Is To Provide Security Certificates.', N'Product Features', N'The Individual Withdrawal Is Required To Be Present Before The Safe Deposit Agency.', N'Offers & Discounts', N'Experience Our Digital Security Certificate Service By Opening An Account Today.', N'Facility of Nomination', N'Debit Card', N'Add A Nominee To Your Safe Deposit Locker To Facilitate The Release Of Contents.', N'Product Features', N'Come Experience Digital Services With Xcalibur Bank In A Digital Way.', N'Offers & Discounts', N'Sounds Great! I Want To Get Started Right Now!! Join Us Now!!')
INSERT [dbo].[accountdetails] ([id], [type], [title], [para1], [para2], [heading], [panel1title], [panel1subtitle1], [panel1subtitle1content], [panel1subtitle2], [panel1subtitle2content], [panel1subtitle3], [panel1subtitle3content], [panel2title], [panel2subtitle1], [panel2subtitle1content], [panel2subtitle2], [panel2subtitle2content], [panel2subtitle3], [panel2subtitle3content], [panel3title], [panel3subtitle1], [panel3subtitle1content], [panel3subtitle2], [panel3subtitle2content], [panel3subtitle3], [panel3subtitle3content], [panel4title], [panel4subtitle1], [panel4subtitle1content], [panel4subtitle2], [panel4subtitle2content], [panel4subtitle3], [panel4subtitle3content], [panel5title], [panel5subtitle1], [panel5subtitle1content], [panel5subtitle2], [panel5subtitle2content], [panel5subtitle3], [panel5subtitle3content], [panel6title], [panel6subtitle1], [panel6subtitle1content], [panel6subtitle2], [panel6subtitle2content], [panel6subtitle3], [panel6subtitle3content]) VALUES (10, N'DIRECTINVEST', N'Direct Invest Account', N'Looking to invest in multiple investment products? Invest in a wide-range of investment products by opening a Demat Account with Xcalibur Direct. It enables you to bring all investment options together under one roof, giving you the power to diversify your portfolio.', N'Here''s is great Trading Account for you which provides access through your Smartphone, Tablet, Laptop or Desktop. Access the best-in-class features aimed to make your investing experience an amazing one. Open Demat Account with Xcalibur Direct and start investing now!', N'6 GREAT REASONS YOU WILL LOVE INVESTING', N'20 INVESTMENT PRODUCTS', N'Debit Card', N'Invest In A Wide-Range Of Investment Products By Opening A Demat Account', N'Product Features', N'It Enables You To Bring All Investment Options Together Under One Roof.', N'Offers & Discounts', N'It Gives You The Power To Diversify Your Portfolio With Your Demat Account.', N'GREAT PLATFORMS TO INVEST', N'Debit Card', N'It Is A Great Trading Account For You Which Provides Access Through Your Gadgets.', N'Product Features', N'Access The Best-In-Class Features Aimed To Make Your Investing Experience An Amazing One', N'Offers & Discounts', N'Open Demat Account With AxisDirect And Start Investing Now.', N'FUN-TASTIC LEARN COURSES', N'Debit Card', N'Think Learning Investments Can Be Boring? Think Again!', N'Product Features', N'Our Fun-Filled Learning Courses Empower You With Varied Financial Instruments.', N'Offers & Discounts`', N'Open A Demat Account With Xcalibur Direct And Welcome A New World Of Learning.', N'POWERFUL RESEARCH SEGMENTS', N'Debit Card', N'It''s Always Prudent To Rely On An Expert, When It Comes To Your Hard Earned Money.', N'Product Features', N'With Xcalibur Direct Demat Account, You Get Access To Our Award Winning Researches.', N'Offers & Discounts', N'Researches Across The Segments So That You Invest With Confidence And Create Wealth.', N'PRESTIGIOUS AWARDS', N'Debit Card', N'Awards We Love, But We Love Our Customer''s Appreciation The Most.', N'Product Features', N'Our Awards Are A Testimony To Our Endeavour To Provide The Best Of The Products & Services.', N'Offers & Discounts', N'Experience Our Award-Winning Service By Opening A Demat Account Today.', N'HAPPY CUSTOMERS', N'Debit Card', N'We Are Simple. Simply Smarter. Simply Awesome. That''s Why We Have Happy Customers.', N'Product Features', N'Come Experience Investing That''s #Simple Is With Xcalibur Demat Account.', N'Offers & Discounts', N'Sounds Great! I Want To Get Started Right Now!! Join Us Now!!')
INSERT [dbo].[accountdetails] ([id], [type], [title], [para1], [para2], [heading], [panel1title], [panel1subtitle1], [panel1subtitle1content], [panel1subtitle2], [panel1subtitle2content], [panel1subtitle3], [panel1subtitle3content], [panel2title], [panel2subtitle1], [panel2subtitle1content], [panel2subtitle2], [panel2subtitle2content], [panel2subtitle3], [panel2subtitle3content], [panel3title], [panel3subtitle1], [panel3subtitle1content], [panel3subtitle2], [panel3subtitle2content], [panel3subtitle3], [panel3subtitle3content], [panel4title], [panel4subtitle1], [panel4subtitle1content], [panel4subtitle2], [panel4subtitle2content], [panel4subtitle3], [panel4subtitle3content], [panel5title], [panel5subtitle1], [panel5subtitle1content], [panel5subtitle2], [panel5subtitle2content], [panel5subtitle3], [panel5subtitle3content], [panel6title], [panel6subtitle1], [panel6subtitle1content], [panel6subtitle2], [panel6subtitle2content], [panel6subtitle3], [panel6subtitle3content]) VALUES (11, N'PENSION', N'Pension Disbursement Account', N'Manage your pension payments with ease and enjoy convenient banking services with Xcalibur Bank''s Pension Disbursement Account. The Pension Disbursement Account simplifies banking for individuals earning pension. Its benefits include latest banking solutions at low costs.', N'All you have to do is open the account using the required documents before getting your first pension and provide a Life Certificate issued by the authority of the organisation you had served earlier. You will have a lots of benefits of the Pension Disbursement Account.', N'6 BENEFITS OF P.D. Account', N'International Debit-cum-ATM Card', N'Debit Card', N'Banking Made Easy With An International Debit-Cum-ATM Card. Join Us Now.', N'Product Features', N'Enjoy Zero Minimum Balance, Auto Sweep & Reverse Sweep Facility Available.', N'Offers & Discounts', N'Banking Made Convenient With Anywhere Banking Available At All Centres.', N'Zero Balance Facility', N'Debit Card', N'Enjoy Zero Minimum Balance, Auto Sweep & Reverse Sweep Facility Available.', N'Product Features', N'Banking Made Easy With An International Debit-Cum-ATM Card. Join Us Now.', N'Offers & Discounts', N'Banking Made Convenient With Anywhere Banking Available At All Centres.', N'Demat Account at No Issuance Charge', N'Debit Card', N'Think Learning Investments Can Be Boring? Think Again!', N'Product Features', N'Our Demat Account At No Issurance Charge Service Is At Boom At This Time.', N'Offers & Discounts', N'Account Opening Charges For Demat Account Waived Off.', N'Authorised Centres l', N'Debit Card', N'Debit Card Available At All Our Authorised Centres Of Xcalibur Bank.', N'Product Features', N'If You Are Eligible For Opening The P.D. Account, Open The A/C. At Our Branch.', N'Offers & Discounts', N'Comprehensive List Of Authorised Centres For Pension Disbursement Account Available.', N'Digital Life Certificate', N'Debit Card', N'Our Major Requisites For The Pensioners Is To Provide Life Certificates.', N'Product Features', N'The Individual Drawing The Pension Is Required To Be Present Before The P.D. Agency', N'Offers & Discounts', N'Experience Our Digital Life Certificate Service By Opening An Account Today.', N'Digital Services', N'Debit Card', N'Easy Access To Mobile, Internet & Tele Banking Services At Our Premises.', N'Product Features', N'Come Experience Digital Services With Xcalibur Bank In A Digital Way.', N'Offers & Discounts', N'Sounds Great! I Want To Get Started Right Now!! Join Us Now!!')
SET IDENTITY_INSERT [dbo].[accountdetails] OFF
SET IDENTITY_INSERT [dbo].[accounts] ON 

INSERT [dbo].[accounts] ([id], [accounttype], [accountdesc1], [accountdesc2]) VALUES (1, N'Saving', N'qqqq', N'mmm')
SET IDENTITY_INSERT [dbo].[accounts] OFF
SET IDENTITY_INSERT [dbo].[adminuser] ON 

INSERT [dbo].[adminuser] ([id], [username], [password]) VALUES (1, N'admin', N'admin')
SET IDENTITY_INSERT [dbo].[adminuser] OFF
SET IDENTITY_INSERT [dbo].[bankservices] ON 

INSERT [dbo].[bankservices] ([id], [usersaccountnumber], [services]) VALUES (3, N'938621820665', N'SMS,InternetBanking,MobileBanking,EmailStatement')
INSERT [dbo].[bankservices] ([id], [usersaccountnumber], [services]) VALUES (4, N'283966850695', N'SMS,InternetBanking,MobileBanking,EmailStatement')
INSERT [dbo].[bankservices] ([id], [usersaccountnumber], [services]) VALUES (5, N'350829565119', N'SMS,InternetBanking,MobileBanking,EmailStatement')
INSERT [dbo].[bankservices] ([id], [usersaccountnumber], [services]) VALUES (6, N'893748371705', N'SMS,InternetBanking,MobileBanking,EmailStatement')
SET IDENTITY_INSERT [dbo].[bankservices] OFF
SET IDENTITY_INSERT [dbo].[beneficiaries] ON 

INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (5, N'Gopal', N'Gopal', N'1234567890', N'12345', N'5000', N'5', N'#123', N'938621820665')
INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (6, N'Mohan', N'mohan', N'296492440966', N'12345', N'70', N'7', N'#111', N'938621820665')
INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (7, N'lk', N'jlk', N'123', N'lkj', N'kl', N'jk', N'lj', N'938621820665')
INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (8, N'fsdg', N'DFHQD', N'DFG', N'SRDG', N'DG', N'DFG', N'DF', N'938621820665')
INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (9, N'ljl', N'kjlk', N'kkkkk', N'lkj', N'98', N'98', N'98jlkjk', N'938621820665')
INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (10, N'kamaltte', N'kamaltte', N'969375530528', N'12345', N'', N'', N'#123', N'938621820665')
INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (11, N'Amit', N'Amit', N'395836433774', N'1234', N'', N'', N'CHD', N'938621820665')
INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (12, N'Amit', N'Amit', N'395836433774', N'1245', N'', N'', N'CHD', N'283966850695')
INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (13, N'Akashdeep', N'Akash', N'974542610105', N'123456', N'', N'', N'NZ', N'350829565119')
INSERT [dbo].[beneficiaries] ([id], [name], [nickname], [accountnumber], [ifsccode], [maxamount], [maxtransactions], [address], [usersaccountnumber]) VALUES (14, N'Amit', N'Amit', N'350829565119', N'123456', N'', N'', N'Gsp', N'893748371705')
SET IDENTITY_INSERT [dbo].[beneficiaries] OFF
SET IDENTITY_INSERT [dbo].[checkbooks] ON 

INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (1, N'test', CAST(0x0000A9C5013E39C3 AS DateTime), NULL, CAST(0x0000A9CC013E39C4 AS DateTime), 0)
INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (2, N'220731428875', CAST(0x0000A9CD00B8EFFC AS DateTime), N'50', CAST(0x0000A9D400B8EFFC AS DateTime), 0)
INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (3, N'220731428875', CAST(0x0000A9D1016FB086 AS DateTime), N'20', CAST(0x0000A9D8016FB086 AS DateTime), 0)
INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (4, N'220731428875', CAST(0x0000A9D200022CCD AS DateTime), N'20', CAST(0x0000A9D900022CCD AS DateTime), 0)
INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (5, N'938621820665', CAST(0x0000A9D5018A6BB2 AS DateTime), N'20', CAST(0x0000A9DC018A6BB2 AS DateTime), 0)
INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (6, N'938621820665', CAST(0x0000A9DB00B987C8 AS DateTime), N'20', CAST(0x0000A9E200B987C8 AS DateTime), 0)
INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (7, N'938621820665', CAST(0x0000A9DB017CEF73 AS DateTime), N'50', CAST(0x0000A9E2017CEF73 AS DateTime), 0)
INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (8, N'283966850695', CAST(0x0000A9DC00A19FAD AS DateTime), N'25', CAST(0x0000A9E300A19FAD AS DateTime), 0)
INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (9, N'350829565119', CAST(0x0000A9DC00AD3F43 AS DateTime), N'25', CAST(0x0000A9E300AD3F43 AS DateTime), 0)
INSERT [dbo].[checkbooks] ([id], [usersaccountnumber], [issuedate], [numberofpages], [delivereddate], [isdelivered]) VALUES (10, N'893748371705', CAST(0x0000A9DD00061943 AS DateTime), N'25', CAST(0x0000A9E400061943 AS DateTime), 0)
SET IDENTITY_INSERT [dbo].[checkbooks] OFF
SET IDENTITY_INSERT [dbo].[faq] ON 

INSERT [dbo].[faq] ([id], [question], [answer]) VALUES (1, N'Re-KYC', N'Testing KYC')
INSERT [dbo].[faq] ([id], [question], [answer]) VALUES (2, N'Fraud & Dispute', N'Answer')
INSERT [dbo].[faq] ([id], [question], [answer]) VALUES (3, N'Internet Banking', N'Action')
INSERT [dbo].[faq] ([id], [question], [answer]) VALUES (4, N'Demat Accounts', N'lkj')
INSERT [dbo].[faq] ([id], [question], [answer]) VALUES (5, N'Forex Cards', N'jl')
INSERT [dbo].[faq] ([id], [question], [answer]) VALUES (6, N'GST', N'lk')
INSERT [dbo].[faq] ([id], [question], [answer]) VALUES (7, N'My card is blocked what to do ?', N'Ok')
SET IDENTITY_INSERT [dbo].[faq] OFF
SET IDENTITY_INSERT [dbo].[transactions] ON 

INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (34, N'', N'', N'938621820665', N'', N'', CAST(0x0000A9D201600D4B AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (35, N'', N'', N'296492440966', N'', N'', CAST(0x0000A9D2017A9A03 AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (36, N'Gopal', N'Gopal', N'938621820665', N'1234567890', N'12345', CAST(0x0000A9D2017B9EFB AS DateTime), N'0', N'500', N'99500', NULL)
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (37, N'Mohan', N'mohan', N'938621820665', N'296492440966', N'12345', CAST(0x0000A9D2017BA3FE AS DateTime), N'0', N'500', N'99000', N'100500')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (38, N'Gopal', N'Gopal', N'938621820665', N'1234567890', N'12345', CAST(0x0000A9D400882B84 AS DateTime), N'0', N'89', N'98911', NULL)
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (39, N'kljklj', N'kljlkj', N'938621820665', N'296492440966', N'08089', CAST(0x0000A9D4008C3230 AS DateTime), N'0', N'90', N'98821', N'100590')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (43, N'SMS', NULL, N'938621820665', N'938621820665', NULL, CAST(0x0000A9D4009EBF56 AS DateTime), N'0', N'75', N'98746', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (44, N'InternetBanking', NULL, N'938621820665', N'938621820665', NULL, CAST(0x0000A9D4009EEA51 AS DateTime), N'0', N'100', N'98646', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (45, N'', N'', N'417062621977', N'', N'', CAST(0x0000A9D401855F37 AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (46, N'', N'', N'230796350739', N'', N'', CAST(0x0000A9D5017CE1BB AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (47, N'', N'', N'930452520450', N'', N'', CAST(0x0000A9D5017D2982 AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (48, N'MobileBanking', NULL, N'938621820665', N'938621820665', NULL, CAST(0x0000A9D5018148E9 AS DateTime), N'0', N'150', N'98496', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (49, N'EmailStatement', NULL, N'938621820665', N'938621820665', NULL, CAST(0x0000A9D5018197A2 AS DateTime), N'0', N'50', N'98446', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (50, N'Gopal', N'Gopal', N'938621820665', N'1234567890', N'12345', CAST(0x0000A9D60002BFC5 AS DateTime), N'0', N'20', N'98426', NULL)
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (51, N'Mohan', N'mohan', N'938621820665', N'296492440966', N'12345', CAST(0x0000A9D600033BE7 AS DateTime), N'0', N'20', N'98406', N'100610')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (52, N'Mohan', N'mohan', N'938621820665', N'296492440966', N'12345', CAST(0x0000A9D60003CC4E AS DateTime), N'0', N'12', N'98394', N'100622')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (53, N'Mohan', N'mohan', N'938621820665', N'296492440966', N'12345', CAST(0x0000A9D60003EB9F AS DateTime), N'0', N'123', N'98271', N'100745')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (54, N'klkj', N'ljlkjlkj', N'938621820665', N'llllll', N'kljlk', CAST(0x0000A9D60008E934 AS DateTime), N'0', N'99', N'98172', NULL)
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (55, N'jlk', N'jl', N'938621820665', N'930452520450', N'l', CAST(0x0000A9D60009BBFC AS DateTime), N'0', N'123', N'98049', N'100123')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (56, N'dfgfd', N'dgd', N'296492440966', N'938621820665', N'2434', CAST(0x0000A9D70017CEF2 AS DateTime), N'0', N'34', N'100711', N'98083')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (57, N'', N'', N'807032366143', N'', N'', CAST(0x0000A9D801732C16 AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1057, N'', N'', N'966439120340', N'', N'', CAST(0x0000A9DB008DBC91 AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1058, N'', N'', N'969375530528', N'', N'', CAST(0x0000A9DB00AD2149 AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1059, N'kamaltte', N'kamaltte', N'938621820665', N'969375530528', N'12345', CAST(0x0000A9DB00B6A9D7 AS DateTime), N'0', N'1000', N'97083', N'101000')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1060, N'kamaltte', N'kamaltte', N'938621820665', N'969375530528', N'12345', CAST(0x0000A9DB00B747DE AS DateTime), N'0', N'1000', N'96083', N'102000')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1061, N'kamaltte', N'kamaltte', N'938621820665', N'969375530528', N'12345', CAST(0x0000A9DB00CBA483 AS DateTime), N'0', N'10', N'96073', N'102010')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1062, N'kamaltte', N'kamaltte', N'938621820665', N'969375530528', N'12345', CAST(0x0000A9DB00CE3E1A AS DateTime), N'0', N'90', N'95983', N'102100')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1063, N'', N'', N'395836433774', N'', N'', CAST(0x0000A9DB017537B7 AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1064, N'Amit', N'Amit', N'938621820665', N'395836433774', N'1234', CAST(0x0000A9DB01760CEA AS DateTime), N'0', N'10000', N'85983', N'110000')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1065, N'kjljkl', N'kljlkj', N'938621820665', N'3958364337746', N'1234', CAST(0x0000A9DB017A6182 AS DateTime), N'0', N'30000', N'55983', NULL)
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1066, N'Amit', N'Amit', N'938621820665', N'395836433774', N'12232', CAST(0x0000A9DB017A9933 AS DateTime), N'0', N'50000', N'5983', N'160000')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1067, N'EmailStatement', NULL, N'938621820665', N'938621820665', NULL, CAST(0x0000A9DB017BCB0E AS DateTime), N'0', N'50', N'5933', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1068, N'Baljeet', N'baljeet', N'395836433774', N'938621820665', N'1234', CAST(0x0000A9DB017E15B3 AS DateTime), N'0', N'20000', N'140000', N'25933')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1069, N'', N'', N'283966850695', N'', N'', CAST(0x0000A9DC009A697A AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1070, N'Amit', N'Amit', N'283966850695', N'395836433774', N'1245', CAST(0x0000A9DC00A1191C AS DateTime), N'0', N'10000', N'90000', N'150000')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1071, N'EmailStatement', NULL, N'283966850695', N'283966850695', NULL, CAST(0x0000A9DC00A17FD9 AS DateTime), N'0', N'50', N'89950', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1072, N'MobileBanking', NULL, N'283966850695', N'283966850695', NULL, CAST(0x0000A9DC00A17FDA AS DateTime), N'0', N'150', N'89850', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1073, N'InternetBanking', NULL, N'283966850695', N'283966850695', NULL, CAST(0x0000A9DC00A17FDC AS DateTime), N'0', N'100', N'89900', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1074, N'SMS', NULL, N'283966850695', N'283966850695', NULL, CAST(0x0000A9DC00A17FE8 AS DateTime), N'0', N'75', N'89925', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1075, N'Akash', N'Akash', N'395836433774', N'283966850695', N'12345', CAST(0x0000A9DC00A56966 AS DateTime), N'0', N'30000', N'120000', N'119850')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1076, N'', N'', N'350829565119', N'', N'', CAST(0x0000A9DC00AAB2A6 AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1077, N'', N'', N'974542610105', N'', N'', CAST(0x0000A9DC00AC1C35 AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1078, N'Akashdeep', N'Akash', N'350829565119', N'974542610105', N'123456', CAST(0x0000A9DC00ACD52E AS DateTime), N'0', N'30000', N'70000', N'130000')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1079, N'EmailStatement', NULL, N'350829565119', N'350829565119', NULL, CAST(0x0000A9DC00AD1230 AS DateTime), N'0', N'50', N'69950', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1080, N'SMS', NULL, N'350829565119', N'350829565119', NULL, CAST(0x0000A9DC00AD1231 AS DateTime), N'0', N'75', N'69925', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1081, N'MobileBanking', NULL, N'350829565119', N'350829565119', NULL, CAST(0x0000A9DC00AD123F AS DateTime), N'0', N'150', N'69850', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1082, N'InternetBanking', NULL, N'350829565119', N'350829565119', NULL, CAST(0x0000A9DC00AD1243 AS DateTime), N'0', N'100', N'69900', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1083, N'Amit', N'Amit', N'974542610105', N'350829565119', N'123456', CAST(0x0000A9DC00AE02CB AS DateTime), N'0', N'60000', N'70000', N'129850')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1084, N'', N'', N'893748371705', N'', N'', CAST(0x0000A9DD0002AFAC AS DateTime), N'100000', N'', N'100000', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1085, N'Amit', N'Amit', N'893748371705', N'350829565119', N'123456', CAST(0x0000A9DD000573FC AS DateTime), N'0', N'40000', N'60000', N'169850')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1086, N'EmailStatement', NULL, N'893748371705', N'893748371705', NULL, CAST(0x0000A9DD0005CF84 AS DateTime), N'0', N'50', N'59950', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1087, N'SMS', NULL, N'893748371705', N'893748371705', NULL, CAST(0x0000A9DD0005CF84 AS DateTime), N'0', N'75', N'59925', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1088, N'MobileBanking', NULL, N'893748371705', N'893748371705', NULL, CAST(0x0000A9DD0005CF8B AS DateTime), N'0', N'150', N'59850', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1089, N'InternetBanking', NULL, N'893748371705', N'893748371705', NULL, CAST(0x0000A9DD0005CF87 AS DateTime), N'0', N'100', N'59900', N'0')
INSERT [dbo].[transactions] ([id], [name], [nickname], [senderaccountnumber], [receiveraccountnumber], [ifsccode], [transactiondate], [creditamount], [debitamount], [senderbalanceamount], [receiverbalanceamount]) VALUES (1090, N'Gurkirat', N'gurkirat', N'350829565119', N'893748371705', N'123456', CAST(0x0000A9DD0007017C AS DateTime), N'0', N'55000', N'114850', N'114900')
SET IDENTITY_INSERT [dbo].[transactions] OFF
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (2004, N'Baljeet', N'Singh', N'baljeetsingh', N'1234', N'123', N'BaljeetSingh', N'938621820665', CAST(0x0000A9D201600C3F AS DateTime), N'0cc162lock_thumb.jpg', N'437001956', N'baljeet@gmail.com', CAST(0x0000A9DC0095BFAE AS DateTime), N'#123 Chandigarh', N'Male', N'Feb  2 2018 12:00AM', N'25933', N'')
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (2005, N'Mohan', N'Sharma', N'mohansharma', N'12345', N'111', N'MohanSharma', N'296492440966', CAST(0x0000A9D2017A99D5 AS DateTime), N'c990f6titledemo2.jpg', N'437001956', N'mohan@gmail.com', CAST(0x0000A9DB0088D97C AS DateTime), N'#123 Mohali', N'Male', N'Feb  2 2018 12:00AM', N'100711', N'')
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (2006, N'lkjlk', N'jlk', N'lklkjkljlk', N'111', NULL, N'lkjlkjlk', N'417062621977', CAST(0x0000A9D401855DCF AS DateTime), NULL, N'', N'jklj', NULL, N'jlk lkjlkjj', N'Male', NULL, N'100000', NULL)
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (2007, N'jl', N'jlk', N'jlkj', N'lkj', NULL, N'jljlk', N'230796350739', CAST(0x0000A9D5017CE0BA AS DateTime), NULL, N'', N'baljeetpnf@gmail.com', NULL, N'jklj klj', N'Male', NULL, N'100000', NULL)
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (2008, N'jl', N'jlk', N'baljeetsinghp', N'123', NULL, N'jljlk', N'930452520450', CAST(0x0000A9D5017D2978 AS DateTime), NULL, N'', N'baljeetpnfi@gmail.com', NULL, N'jklj klj klj klj klj klj', N'Female', NULL, N'100123', NULL)
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (2009, N'Ram', N'Chander', N'ram', N'123', NULL, N'RamChander', N'807032366143', CAST(0x0000A9D801732AF4 AS DateTime), NULL, N'', N'ramchander@gmail.com', NULL, N'#123 Chandigarh', N'Male', NULL, N'100000', NULL)
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (3009, N'Vandhana', N'Sharma', N'vandhana', N'12345', NULL, N'VandhanaSharma', N'966439120340', CAST(0x0000A9DB008DBB9C AS DateTime), NULL, N'', N'vandhana@gmail.com', NULL, N'#123 chandigarh', N'Female', NULL, N'100000', NULL)
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (3010, N'kamall', N'deep', N'kamaldep', N'123', N'123456789', N'kamalldeep', N'969375530528', CAST(0x0000A9DB00AD2091 AS DateTime), N'd9c174Hydrangeas.jpg', N'437001956', N'kamal12@gmail.com', CAST(0x0000A9DB00AD635A AS DateTime), N'123 chd', N'Male', N'Feb  2 2018 12:00AM', N'102100', N'')
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (3011, N'Amit', N'Kumar', N'amit', N'12345', N'12345', N'AmitKumar', N'395836433774', CAST(0x0000A9DB01753779 AS DateTime), N'4a8136lock_thumb.jpg', N'9888935531', N'amit@gmail.com', CAST(0x0000A9DC00A50775 AS DateTime), N'#123 Chd', N'Male', N'26/02/1990', N'120000', N'')
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (3012, N'Akashdeep', N'Singh', N'akash', N'123456', N'123456', N'AkashdeepSingh', N'283966850695', CAST(0x0000A9DC009A68B5 AS DateTime), N'4d4dc3lock_thumb.jpg', N'9888935531', N'singhda1997@gmail.com', CAST(0x0000A9DC00A60669 AS DateTime), N'Street No 45 NZ', N'Male', N'26/02/1990', N'119850', N'')
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (3013, N'Amit', N'Kumar', N'Amit26485', N'12345678', N'12345678', N'AmitKumar', N'350829565119', CAST(0x0000A9DC00AAB1EA AS DateTime), N'd82ae5lock_thumb.jpg', N'9888935531', N'impdata26485@gmail.com', CAST(0x0000A9E601545DFF AS DateTime), N'Gsp Gsp', N'Male', N'26/02/1990', N'114850', N'')
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (3014, N'Akashdeep', N'Singh', N'Akashdeep', N'12345', N'12345', N'AkashdeepSingh', N'974542610105', CAST(0x0000A9DC00AC1C2B AS DateTime), N'002916favicon.png', N'9888935531', N'singhda@gmail.com', CAST(0x0000A9DC00AE449B AS DateTime), N'NZ Auckland', N'Male', N'26/02/1990', N'70000', N'')
INSERT [dbo].[users] ([id], [firstname], [lastname], [username], [password], [transactionpassword], [holdername], [accountnumber], [createdon], [image], [contactnumber], [email], [lastlogin], [location], [gender], [dateofbirth], [accountbalance], [randomtext]) VALUES (3015, N'Gurkirat', N'Singh', N'gurkirat', N'12345', N'12345', N'GurkiratSingh', N'893748371705', CAST(0x0000A9DD0002AE69 AS DateTime), N'c08792lock_thumb.jpg', N'422022431', N'singh@gmail.com', CAST(0x0000A9DD0007B765 AS DateTime), N'#123 Auckland', N'Male', N'22/03/1997', N'114900', N'')
SET IDENTITY_INSERT [dbo].[users] OFF
USE [master]
GO
ALTER DATABASE [ebanking] SET  READ_WRITE 
GO
