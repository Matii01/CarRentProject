using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using Spire.Doc;
using Spire.Xls;


namespace CarRent.Service.Service
{
    public class GenerateDocumentService : IGenerateDocumentService
    {
        public string GenerateInvoiceDocxDocumentAsync(NewInvoiceDto invoiceDto, AboutCompanyDto aboutCompany)
        {
            if (invoiceDto.IsIndividual && invoiceDto.InvoiceIndividual != null)
            {
                string inputFile = GetPathForDocInvoiceTemplateFile();
                string outputFile = GetPathForDocInvoiceResultFile();

                var item = GenerateValueForIndividualClientDocument(invoiceDto.InvoiceIndividual, aboutCompany);

                GenerateDocumentFromTemplate(inputFile, outputFile, item);


                return outputFile;
            }
            else
            {
                throw new NotImplementedException();
            }
        }

        public static void GenerateDocumentFromTemplate(string inputPath, string outputPath, Dictionary<string, string> replacements)
        {

            var document = new Document();
            document.LoadFromFile(inputPath);

            foreach (var key in replacements.Keys)
            {
                document.Replace(key, replacements[key], false, true);
            }

            document.SaveToFile(outputPath, Spire.Doc.FileFormat.Docx);
        }

        public string GenerateExcelDocument(List<ForCarsReport> rows, string filePath)
        {
            Workbook workbook = new ();
            Worksheet sheet = workbook.Worksheets[0];

            string[] headers = new string[] { "ID", "CarName", "Cost", "RentalCount", "TotalRentalDays", "AverageRentalDays" };

            for (int i = 0; i < headers.Length; i++)
            {
                sheet.Range[1, i + 1].Text = headers[i];
            }

            for (int i = 0; i < rows.Count; i++)
            {
                var invoice = rows[i];
                sheet.Range[i + 2, 1].NumberValue = invoice.CarId;
                sheet.Range[i + 2, 2].Text = invoice.CarName;
                sheet.Range[i + 2, 3].NumberValue = (double)invoice.Cost;
                sheet.Range[i + 2, 4].NumberValue = invoice.RentalCount;
                sheet.Range[i + 2, 5].NumberValue = invoice.TotalRentalDays;
                sheet.Range[i + 2, 6].NumberValue = invoice.AverageRentalDays;
            }


            var excelPath = GetPathForExcelDocuments();
            filePath = $@"{excelPath}\CarsReport.xlsx";

            sheet.AllocatedRange.AutoFitColumns();
            workbook.SaveToFile(filePath);

            return filePath;
        }

        public string GenerateExcelDocument(List<InvoiceForReportDto> rows, string filePath)
        {
            Workbook workbook = new ();
            Worksheet sheet = workbook.Worksheets[0];

            string[] headers = new string[] { "ID", "Klient", "Zapłacono", "Do zapłaty", "Data powstania", "Data płatności" };

            for(int i = 0; i < headers.Length; i++)
            {
                sheet.Range[1, i+1].Text = headers[i];
            }

            for(int i = 0; i < rows.Count; i++)
            {
                var invoice = rows[i];
                sheet.Range[i + 2, 1].NumberValue = invoice.Id;
                sheet.Range[i + 2, 2].Text = invoice.Client;
                sheet.Range[i + 2, 3].NumberValue = (double)(invoice.TotalPaid != null ? invoice.TotalPaid : 0);
                sheet.Range[i + 2, 4].NumberValue = (double)(invoice.TotalToPay != null ? invoice.TotalToPay : 0);
                if (invoice.CreatedDate.HasValue)
                {
                    sheet.Range[i + 2, 5].DateTimeValue = invoice.CreatedDate.Value;
                }
                else
                {
                    sheet.Range[i + 2, 5].Text = "N/A";
                }
                if (invoice.PaymentDate.HasValue)
                {
                    sheet.Range[i + 2, 6].DateTimeValue = invoice.PaymentDate.Value;
                }
                else
                {
                    sheet.Range[i + 2, 6].Text = "N/A";
                }
            }

            var excelPath = GetPathForExcelDocuments();
            filePath = $@"{excelPath}\InvoiceReport.xlsx";

            sheet.AllocatedRange.AutoFitColumns();
            workbook.SaveToFile(filePath);
            
            return filePath;
        }

        public string GenerateExcelDocument(List<ForMonthReport> rows, string filePath)
        {
            Workbook workbook = new ();
            Worksheet sheet = workbook.Worksheets[0];

            string[] headers = new string[] { "Nr", "Rok", "Miesiąc", "Przychód" };

            for (int i = 0; i < headers.Length; i++)
            {
                sheet.Range[1, i + 1].Text = headers[i];
            }

            for (int i = 0; i < rows.Count; i++)
            {
                var invoice = rows[i];
                sheet.Range[i + 2, 1].NumberValue = i+1;
                sheet.Range[i + 2, 2].NumberValue = invoice.Year;
                sheet.Range[i + 2, 3].Text = invoice.Month;
                sheet.Range[i + 2, 4].NumberValue = (double)invoice.Amount;
            }

            var excelPath = GetPathForExcelDocuments();
            filePath = $@"{excelPath}\MonthReport.xlsx";

            sheet.AllocatedRange.AutoFitColumns();
            workbook.SaveToFile(filePath);

            return filePath;
        }
        
        public string GetPathForExcelDocuments()
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            string parentDirectory = (Directory.GetParent(currentDirectory)?.FullName) 
                ?? throw new Exception("File do not exist");
            string templateFile = Path.Combine(parentDirectory, "ExcelFiles");
            return templateFile;
        }

        private static string GetPathForDocInvoiceTemplateFile()
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            string parentDirectory = Directory.GetParent(currentDirectory)?.FullName
                ?? throw new Exception("Template file do not exist");
            string templateFile = Path.Combine(parentDirectory, "documentTemplates");
            string filePath = Path.Combine(templateFile, "faktura.docx");
            
            return filePath;
        }

        private static string GetPathForDocInvoiceResultFile()
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            string parentDirectory = (Directory.GetParent(currentDirectory)?.FullName)
                ?? throw new Exception("template file do not exist");
                
            string templateFile = Path.Combine(parentDirectory, "documentTemplates");
            string filePath = Path.Combine(templateFile, "faktura1.docx");
            return filePath;
        }

        private Dictionary<string, string> GenerateValueForFirmClientDocument(InvoiceWithFirmClient invoice)
        {
            var keyValuePairs = new Dictionary<string, string>();

            return keyValuePairs;
        }
        
        private static Dictionary<string, string> GenerateValueForIndividualClientDocument(InvoiceWithIndividualClient invoice, AboutCompanyDto aboutCompany)
        {
            var rental = invoice.InvoiceItems.First();
            var totalToPay = invoice?.TotalToPay - invoice?.TotalPay ?? 0;

            var keyValuePairs = new Dictionary<string, string>() 
            {
                { "@FakturaNr@"         , invoice?.Number ?? "" },
                { "@dataW@"             , GetCreatedData(invoice) },
                { "@dataD@"             , rental.Rental?.RentalStart.ToShortDateString() ?? "" },
                { "@firma@"             , aboutCompany.Name },
                { "@nabywca@"           , GetBuyerName(invoice) },
                { "@nrKlienta@"         , "123456789" },
                { "@nrNIP@"             , aboutCompany.NIP },
                { "@nazwaBanku@"        , "PKO BP" },
                { "@nrKonta@"           , "5654645456465456" },
                { "@nazwaT@"            , rental.Rental?.CarName ?? "" },
                { "@nrK@"               , "65465156156165564" },
                { "@ilosc@"             , "1" },
                { "@jm@"                , "szt" },
                { "@CBrutto@"           , rental.Gross.ToString() },
                { "@CNetto@"            , rental.Net.ToString() },
                { "@VATP@"              , rental.VAT.ToString() },
                { "@VATK@"              , rental.VATValue.ToString() },
                { "@Lp@"                , "1" },
                { "@kwotaVAT@"          , rental.VATValue.ToString()  },
                { "@nettoR@"            , rental.Net.ToString() },
                { "@bruttoR@"           , invoice?.TotalToPay?.ToString()?? "" },
                { "@kwotaDZ@"           , totalToPay.ToString() },
                { "@sposobP@"           , "" },
                { "@termin@"            , GetPaymentData(invoice) },
                { "@dokumentWystawil@"  , "" },
                { "@FAdres@"            , aboutCompany.Address?? "" },
                { "@NAdres@"            , invoice?.Client?.Address ?? "" },
            };

            return keyValuePairs;
        }

        private static string GetCreatedData(InvoiceWithIndividualClient? invoice)
        {
            if(invoice !=null && invoice.CreatedDate != null)
            {
                invoice.CreatedDate.Value.ToShortDateString();
            }
            return string.Empty;
        }

        private static string GetPaymentData(InvoiceWithIndividualClient? invoice)
        {
            if (invoice != null && invoice.PaymentDate != null)
            {
                invoice.PaymentDate.Value.ToShortDateString();
            }
            return string.Empty;
        }

        private static string GetBuyerName(InvoiceWithIndividualClient? invoice)
        {
            if(invoice != null && invoice.Client != null)
            {
                return $"{invoice.Client.FirstName} {invoice.Client.LastName}";
            }
            return string.Empty;
        }
    }
}
