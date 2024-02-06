using CarRent.data.DTO;
using CarRent.Service.Interfaces;
using MimeKit;
using Spire.Doc;
using Spire.Doc.Documents;
using Spire.Xls;


namespace CarRent.Service.Service
{
    public class GenerateDocumentService : IGenerateDocumentService
    {
        public string GenerateInvoiceDocxDocumentAsync(NewInvoiceDto invoiceDto)
        {
            if (invoiceDto.IsIndividual && invoiceDto.InvoiceIndividual != null)
            {
                //string directory = AppDomain.CurrentDomain.BaseDirectory;
                //Console.WriteLine("Executable Directory: " + directory);

                string filePath = @"C:\Users\msi\Desktop\faktura.docx"; // Path to your source Word document
                string outputFile = @"C:\Users\msi\Desktop\faktura1.docx"; // Path to save the modified Word document

                var item = GenerateValueForIndividualClientDocument(invoiceDto.InvoiceIndividual);
                var templatePath = GetPathForDocInvoiceTemplateFile();

                GenerateDocumentFromTemplate(filePath, outputFile, item);


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

        public string GenerateExcelDocument(List<InvoiceForReportDto> rows, string filePath)
        {
            Workbook workbook = new Workbook();
            Worksheet sheet = workbook.Worksheets[0];

            string[] headers = new string[] { "ID", "Klient", "Zapłacono", "Do zapłaty", "Data powstania", "Data płatności" };

            // insert headers into the first row
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

            filePath = @"C:\Users\msi\Desktop\file.xlsx";
            
            sheet.AllocatedRange.AutoFitColumns();
            workbook.SaveToFile(filePath);
            
            return filePath;
        }

        private string GetPathForDocInvoiceTemplateFile()
        {
            try
            {
                string currentDirectory = Directory.GetCurrentDirectory();
                string parentDirectory = Directory.GetParent(currentDirectory).FullName;
                string templateFile = Path.Combine(parentDirectory, "documentTemplates");
                string filePath = Path.Combine(templateFile, "faktura.docx");
                
                return filePath;
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
                throw new Exception("template file do not exist");
            }
        }

        private static string GetPathForDocInvoiceResultFile()
        {
            try
            {
                string currentDirectory = Directory.GetCurrentDirectory();
                string parentDirectory = Directory.GetParent(currentDirectory).FullName;
                string templateFile = Path.Combine(parentDirectory, "documentTemplates");
                string filePath = Path.Combine(templateFile, "faktura1.docx");

                return filePath;
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
                throw new Exception("template file do not exist");
            }
        }

        private Dictionary<string, string> GenerateValueForFirmClientDocument(InvoiceWithFirmClient invoice)
        {
            var keyValuePairs = new Dictionary<string, string>();

            return keyValuePairs;
        }
        
        private Dictionary<string, string> GenerateValueForIndividualClientDocument(InvoiceWithIndividualClient invoice)
        {
            var keyValuePairs = new Dictionary<string, string>()
            {
                { "@FakturaNr@"         , "nr/15515" },
                { "@dataW@"             , "2024-12-12" },
                { "@dataD@"             , "2024-12-13" },
                { "@firma@"             , "Nazwa firmy" },
                { "@nabywca@"           , "Adam Nijaki" },
                { "@nrKlienta@"         , "123456789" },
                { "@nrNIP@"             , "3465465465465" },
                { "@nazwaBanku@"        , "PKO BP" },
                { "@nrKonta@"           , "5654645456465456" },
                { "@nazwaT@"            , "Skoda Fabia IV" },
                { "@nrK@"               , "65465156156165564" },
                { "@ilosc@"             , "1" },
                { "@jm@"                , "szt" },
                { "@CBrutto@"           , "150" },
                { "@CNetto@"            , "130" },
                { "@VATP@"              , "23" },
                { "@VATK@"              , "20" },
                { "@Lp@"                , "1" },
                { "@kwotaVAT@"          , "20" },
                { "@nettoR@"            , "0" },
                { "@bruttoR@"           , "150" },
                { "@kwotaDZ@"           , "155" },
                { "@sposobP@"           , "2024-12-12" },
                { "@termin@"            , "2024-12-12" },
                { "@dokumentWystawil@"  , "Nikt" },
                { "@FAdres@"            , "Adres firmy" },
                { "@NAdres@"            , "asdasd" },
            };

            return keyValuePairs;
        }
    }
}
