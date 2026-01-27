Dependency Injection in rust is quite simple since its a functional programming language. You can pass dependencies as function parameters or use traits for more complex scenarios.

```rust
// Define a trait for a service
trait DataService {
    fn get_data(&self) -> String;
}
// Implement the trait for a concrete type
struct ApiService;
impl DataService for ApiService {
    fn get_data(&self) -> String {
        "Data from API".to_string()
    }
}
// Creating a mock implementation for testing
mod tests {
    use super::*;
    struct MockService;
    impl DataService for MockService {
        fn get_data(&self) -> String {
            "Mock Data".to_string()
        }
    }
    #[test]
    fn test_get_data() {
        let mock_service = MockService;
        assert_eq!(mock_service.get_data(), "Mock Data");
    }
}

// Using generics instead of concrete types
fn fetch_data<T: DataService>(service: &T) -> String { // T just has to implement data service, hence we can use our mock service here
    service.get_data()
}

// Example with a structs
struct DataFetcher<T: DataService> {
    service: T,
}
```
