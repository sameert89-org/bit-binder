> Allows you to define a high level flow and have other classes make changes in certain steps.

### When do I need Template Method?
Use it when:
- Several classes perform the same high-level workflow.
- Some steps differ between implementations.

**Why not strategy?** 
Strategy makes more sense when you want to swap algorithms at runtime or you have many *unrelated* classes using the same behavior.
## Example Report Generator

```csharp
namespace MyApp;

public class ReportGenerator {
	public void GenerateReport() {
		CollectData();
		FormatData();
		ExportReport();	
	}
	
	private abstract void CollectData(); // abstract forces implementation, its better to use virtual methods if you want to provide default implementations and the children may chose to override it
	private abstract void FormatData();
	private abstract void ExportData();
}

public class StudentExamReportGenerator : ReportGenerator {

}

public class SchoolFinancialReportGenerator : ReportGenerator {
}
```
