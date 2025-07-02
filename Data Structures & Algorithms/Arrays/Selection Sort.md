#algorithms #sorting 


> [!hint] Intuition
> *I pick up an element, I find out if its the smallest, then exchange it with the first element, now I look up in the rest of the array excluding the first element, if it is smallest I exchange it with position 2*


## Implementation

```csharp
using System.Collections.Generic;
public static void SelectionSort(List<int> collection)
{
	if (collection.Count == 0)
		return;

	for (int i = 0; i < collection.Count - 1; i++)
	{
		int currentMinPos = i;

		for (int j = i + 1; j < collection.Count; j++)
		{
			if (collection[j] < collection[currentMinPos])
			{
				currentMinPos = j;
			}
		}

		// Swap if needed
		if (currentMinPos != i)
		{
			int temp = collection[i];
			collection[i] = collection[currentMinPos];
			collection[currentMinPos] = temp;
		}
	}
}
```
