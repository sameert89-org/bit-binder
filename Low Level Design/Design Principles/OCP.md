> **A class should be open for extension but closed for modification.**

A system will always need new features, but existing features should not need to change when those features are added.

Interfaces and abstractions are your friends :), but do not overdo them.

## Example: Code that violates OCP

```cpp
enum class ExportFormat { Json, Csv };

class ReportGenerator {
public:
    void exportReport(const std::string& data, ExportFormat format) {
        // High-level business logic (the "Closed" part)
        std::string processedData = "Report Header\n" + data;

        // The "Open" part that is currently CLOSED to extension
        if (format == ExportFormat::Json) {
            std::cout << "{\"data\": \"" << processedData << "\"}\n";
        } else if (format == ExportFormat::Csv) {
            std::cout << "Data_CSV," << processedData << "\n";
        }
        // To add XML, you have to modify this specific function.
    }
};
```
## Corrected code

```cpp
#include <iostream>
#include <string>
#include <memory>

// 1. Define the Interface (The extension point)
class IFormatter {
public:
    virtual ~IFormatter() = default;
    virtual void format(const std::string& data) const = 0;
};

// 2. Concrete implementations (In separate files if needed)
class JsonFormatter : public IFormatter {
public:
    void format(const std::string& data) const override {
        std::cout << "{\"data\": \"" << data << "\"}\n";
    }
};

class CsvFormatter : public IFormatter {
public:
    void format(const std::string& data) const override {
        std::cout << "CSV," << data << "\n";
    }
};

// 3. The Core Logic (Closed for Modification)
class ReportEngine {
public:
    // This function never changes, no matter how many formats you add
    void generate(const std::string& rawData, const IFormatter& formatter) {
        std::string processed = "--- Processed Data ---\n" + rawData;
        formatter.format(processed);
    }
};

// 4. Extension: Adding XML without touching existing classes
class XmlFormatter : public IFormatter {
public:
    void format(const std::string& data) const override {
        std::cout << "<data>" << data << "</data>\n";
    }
};

int main() {
    ReportEngine engine;

    JsonFormatter json;
    XmlFormatter xml; // Added later without modifying ReportEngine

    engine.generate("User Login Logs", json);
    engine.generate("Financial Records", xml);

    return 0;
}
```
