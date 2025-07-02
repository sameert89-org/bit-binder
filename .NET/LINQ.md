Link stands for *Language Integrated Query*, it's a set of technologies based on the integration of query capabilities directly into C#.

There are two syntax possible, the method syntax and the query syntax. All LINQ queries offer the query syntax while the method syntax is available for select few.


### **Some common LINQ queries:**

- **Where:** filters on a boolean criteria true or not. Example of Where is shown above.
- **OfType:** filters based on each element’s type.

```csharp
IList mixedList = new ArrayList();
mixedList.Add(0);
mixedList.Add("One");
mixedList.Add("Two");
mixedList.Add(3);
mixedList.Add(new Student() { StudentID = 1, StudentName = "Bill" });

var stringResult = from s in mixedList.OfType<string>()
                select s;

var intResult = from s in mixedList.OfType<int>()
                select s;
```

- **OrderBy:** sorting operator.

```csharp
IList<Student> studentList = new List<Student>() { 
    new Student() { StudentID = 1, StudentName = "John", Age = 18 } ,
    new Student() { StudentID = 2, StudentName = "Steve",  Age = 15 } ,
    new Student() { StudentID = 3, StudentName = "Bill",  Age = 25 } ,
    new Student() { StudentID = 4, StudentName = "Ram" , Age = 20 } ,
    new Student() { StudentID = 5, StudentName = "Ron" , Age = 19 } 
};

var orderByResult = from s in studentList
                   orderby s.StudentName 
                   select s;

var orderByDescendingResult = from s in studentList
                   orderby s.StudentName descending
                   select s;
```

- **ThenBy:**  Sorting based on multiple fields. Only available using method syntax.

```csharp
var sortedStudents = studentList.OrderBy(s => s.StudentName).ThenBy(s => s.Age);
```

- **Select:** Projects each element of a sequence into a new form.

```csharp
var names = from s in studentList
            select s.StudentName;

// Method syntax
var namesMethod = studentList.Select(s => s.StudentName);
```

- **GroupBy:** Groups the elements of a sequence according to a specified key selector function.

```csharp
var groupedResult = from s in studentList
                    group s by s.Age;

// Method syntax
var groupedResultMethod = studentList.GroupBy(s => s.Age);
```
- **Join:** Joins two sequences based on matching keys extracted from the elements.

```csharp
var innerJoinQuery = from s in studentList
                     join c in classroomList on s.StudentID equals c.StudentID
                     select new { StudentName = s.StudentName, ClassName = c.ClassName };

// Method syntax
var innerJoinMethod = studentList.Join(classroomList,
                                       s => s.StudentID,
                                       c => c.StudentID,
                                       (s, c) => new { StudentName = s.StudentName, ClassName = c.ClassName });
```

- **Distinct:** Removes duplicate elements from a sequence.

```csharp
var distinctAges = (from s in studentList
                    select s.Age).Distinct();

// Method syntax
var distinctAgesMethod = studentList.Select(s => s.Age).Distinct();
```
- **Count:** Returns the number of elements in a sequence.

```csharp
var numberOfStudents = (from s in studentList
                        select s).Count();

// Method syntax
var numberOfStudentsMethod = studentList.Count();
```
Also Read: [[Extension Methods]]