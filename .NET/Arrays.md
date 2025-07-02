**Created:** 2024-03-06 10:25
**Author:** Sameer89

Arrays are contiguous blocks of memory, they are like in `c++` not dynamically resizable, once declared their size is fixed. They are reference types wrapping `System.Array` class-

## Creating  Basic Arrays
```csharp
// Creating an array
int[] myArray = new int[5]; // <- 5 is the size

int[] myArray = {1,2,3,4,5};

int[] myArray = new int[5]{1,2,3,4,5}; // <- the length of the initializer list must match the size

int[] myArray = new int[]{1,2,3};

// .NET Core only

int[] myArray = new[]{1, 2, 3};

int[] myArray;

myArray = new int[]{1,2,3,4,5}; // <- This also works

myArray = {1,2,3} // <- This does not work
```

## Multidimensional Arrays & Jagged Arrays

*Jagged arrays are those arrays whose child arrays may be of different sizes.*

```csharp

int[,] my2DArray = new int[2,2]{{1,2}, {3,4}};

int [,,] my3DArray = {{{1}}};

int [][] myJaggedArray = new int[6][];

myJaggedArray[0] = [1,2,3];

myJaggedArray[1] = [5,6,6,7,8];
```

### Accessing Array Elements

```csharp
myArray[0]; // This is for 1D array
my2DArray[0, 0]; // This is for 2D array
```

If you try to access something that is out of bounds you get the classic `IndexOutOfRangeException`.
## Array Properties & Methods

- **Length**: Tells the length of the array, in case of multidimensional arrays, it tells the length of the first dimension. 
- **Rank**: Tells the number of dimensions of the array.
- **GetLength(dim)**: Gets the length of the dimension of the array.
- **Clone()**: Creates shallow copy of the array.
- **CopyTo(obj, index)**: Copies the elements to target container starting at specific index. Only works when both are 1D arrays.
- **GetLowerBound(dim)**: This is not the same as lower bound, this just fetches the first element of that dimension.
- **GetUpperBound(dim)**: This fetches the last element of the specified dimension. 

## Passing Arrays

Arrays like other reference types are passed by reference. However the callee does not need to know about the size declarations of the array.

```csharp
static void Print2DArray(int[,] arr)
{
    // Display the array elements.
    for (int i = 0; i < arr.GetLength(0); i++)
    {
        for (int j = 0; j < arr.GetLength(1); j++)
        {
            System.Console.WriteLine("Element({0},{1})={2}", i, j, arr[i, j]);
        }
    }
}
static void ExampleUsage()
{
    // Pass the array as an argument.
    Print2DArray(new int[,] { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } });
}
/* Output:
    Element(0,0)=1
    Element(0,1)=2
    Element(1,0)=3
    Element(1,1)=4
    Element(2,0)=5
    Element(2,1)=6
    Element(3,0)=7
    Element(3,1)=8
*/
```

Also Read: [[Lists]]